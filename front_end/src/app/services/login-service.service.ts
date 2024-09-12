import { Injectable } from '@angular/core';
import { Credentials } from '../models/User';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _token: string | undefined;

  constructor(private http: HttpClient) { }

  login(creds: Credentials) {
    return this.http.post('http://localhost:8080/login', creds, {
        observe: 'response'
    }).pipe(
        map((response: HttpResponse<any>) => {
            const headers = response.headers;
            const bearerToken = headers.get('Authorization');
            const _token = bearerToken?.replace('Bearer ', '');

            if (_token && this.isBrowser()) { // Verifica si estamos en el navegador
                localStorage.setItem('token', _token);
                this._token = _token;
                console.log('Token almacenado:', _token);
            } else {
                console.log('No se recibió un token de autorización o no estamos en el navegador.');
            }

            return response.body;
        })
    );
  }

  get token(): string {
    if (this.isBrowser()) { // Verifica si estamos en el navegador
      const storedToken = localStorage.getItem('token');
      if (storedToken !== null) {
          this._token = storedToken;
      }
    }
    return this._token || '';
  }

  logout() {
    if (this.isBrowser()) { // Verifica si estamos en el navegador
      localStorage.removeItem('token');
    }
    this._token = undefined; // Restablece el token en la variable local
  }

  
  getPayload(token: string) {
    if (token != null) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    }
    return null;
  }

  


  // Método para verificar si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
