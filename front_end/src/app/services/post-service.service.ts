import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Post } from '../models/Post';
import { catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private url: string = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Método para crear un post
  createPost(post: Post, id: number): Observable<Post> {
    const params = new HttpParams().set('userId', id);
    return this.http.post<Post>(`${this.url}`, post, { params });
  }


  findAllPosts(): Observable<Post[]> {
    // Verificamos si estamos en un ambiente de navegador
    if (isPlatformBrowser(this.platformId)) {
      console.log('Estamos en el navegador');
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<Post[]>(this.url, { headers });
      } else {
        return throwError(() => new Error('Token no disponible. Redirigiendo al login.'));
      }
    } else {
      console.error('No estamos en el navegador, localStorage no está disponible.');
      return throwError(() => new Error('LocalStorage no está disponible.'));
    }
  }

  findPostsByUserId(id: number){
    const params = new HttpParams().set('id', id);
    return this.http.get<Post[]>(`${this.url}/profile`, {params})

  }
}  
