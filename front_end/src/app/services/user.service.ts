import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, User } from '../models/User';
import { catchError, map, Observable, throwError } from 'rxjs';
import { default as jwt_decode } from 'jwt-decode';
  



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<User>{
    return this.http.post<User>(this.url, user).pipe(
      catchError(this.handleError)
    );
  }


findUserByEmail(email: string): Observable<User> {
  console.log(email)
  const params = new HttpParams().set('email', email); 
  return this.http.get<User>(`${this.url}/email`, { params });
}

updateUser(body: any, id: number){
  const params = new HttpParams().set('id', id);
  return this.http.put<any>(`${this.url}`,body, { params });
}

  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error proveniente del backend
      if (error.status === 500) {
        // 500 es el código de estado para conflicto (teléfono o correo ya existen)
        errorMessage = 'El número de teléfono o correo electrónico ya están registrados.';
      } else {
        errorMessage = `Error: ${error.status} - ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}


