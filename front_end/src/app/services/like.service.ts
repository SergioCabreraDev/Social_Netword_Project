import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Likes, LikesDTO, Post } from '../models/Post';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private url: string = 'http://localhost:8080/api/likes';



  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  addLike(like: LikesDTO): Observable<LikesDTO>{

    return this.http.post<LikesDTO>(this.url,like);

  }

  deleteLike(like_id: number): Observable<any>{
    const params = new HttpParams().set('id', like_id);
    return this.http.delete<any>(this.url, {params});
  }


  changeStateLike(post: Post, likeDTO: LikesDTO, currentUser: User) {
    likeDTO.post_id = post.postId;
    likeDTO.user_id = currentUser.user_id;
  
    // Si el usuario no ha dado like
    if (!post.likedByCurrentUser) {
      this.addLike(likeDTO).subscribe(
        resp => {
          post.likedByCurrentUser = true;
          console.log(resp);
          post.likes.push({'like_id': resp.like_id, 'user': currentUser, 'liked_at': ''})
        },
        error => console.error('Error al agregar like', error)
      );
    } else {
      // Si el usuario ya dio like, lo elimina
      const likeToRemove = post.likes.find(like => like.user.user_id === currentUser.user_id);
      if (likeToRemove) {
        console.log(likeToRemove)
        this.deleteLike(likeToRemove.like_id).subscribe(
          resp => {
            post.likedByCurrentUser = false;
            // Filtrar para eliminar el like correspondiente
            post.likes = post.likes.filter(like => like.user.user_id !== currentUser.user_id);
          },
          error => console.error('Error al eliminar like', error)
        );
      }
    }
  }
  



}
