import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Inject, PLATFORM_ID, Input } from '@angular/core';
import { PostServiceService } from '../../../services/post-service.service';
import { LikesDTO, Post } from '../../../models/Post';
import { formatDistanceToNow } from 'date-fns';
import { es, fi } from 'date-fns/locale';
import { interval, Subscription } from 'rxjs';
import { takeWhile, startWith } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../models/User';
import { LikeService } from '../../../services/like.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {




  posts: Post[] = [];
  newLoadPosts: Post[] = [];
  private intervalSubscription: Subscription = new Subscription();
  private intervalTime: number = 3000;
  private alive: boolean = true; // Controla la subscripción
  newPosts: boolean = false;
  private firstLoad: boolean = true; // Variable para controlar la primera carga
  private mainLoad: boolean = true;
  @Input() currentUser!: User;
  postSearch: Post | undefined;
  likeDTO: LikesDTO;



  constructor(private servicePost: PostServiceService, @Inject(PLATFORM_ID) private platformId: Object, private likeService: LikeService,private router:Router) {
    this.likeDTO = new LikesDTO();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if(this.mainLoad == true){
        this.findAllPosts(); // Carga inicial de posts
        this.startIntervalRefresh()
        this.mainLoad = false
         // Iniciar el refresco de posts
      }
     
    } else {
      console.log('No estamos en el navegador, findAllPosts no se ejecutará.');
    }
  }

  

  startIntervalRefresh() {
    this.intervalSubscription = interval(this.intervalTime)
      .pipe(
        startWith(0), // Ejecuta inmediatamente
        takeWhile(() => this.alive) // Activa el ciclo mientras el componente esté vivo
      )
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          this.findAllPosts();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false; // Detener el ciclo
    this.intervalSubscription.unsubscribe(); // Limpiar la subscripción
  }

  cambiarValorNewPost() {
    this.newPosts = false
    this.newLoadPosts = this.posts;
  }

  findAllPosts() {
    this.servicePost.findAllPosts().subscribe({
      next: (res) => {
        console.log(res.length);

        // Solo cambia newPosts a true si no es la primera carga ya que firstload lo evalua como false y no se cumple la condición
        if (!this.firstLoad && res.length > this.posts.length) {
          this.newPosts = true;
          console.log(this.newPosts);
        }

        this.posts = res
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(post => ({
          ...post,
          likedByCurrentUser: post.likes.some(like => like.user.user_id === this.currentUser.user_id),
          timeAgo: this.calculateTimeAgo(post.createdAt),
        }));
      

        if(this.firstLoad){
          this.newLoadPosts = this.posts;
        }
        console.log(this.posts);
        console.log(this.newLoadPosts);
        // Cambia firstLoad a false después de la primera carga
        this.firstLoad = false;
      },
      error: (error) => {
        console.error('Error al obtener los posts:', error.message);
      }
    });
  }
  changeStateLike(post: Post) {
    this.likeDTO.post_id = post.postId;
    this.likeDTO.user_id = this.currentUser.user_id;
  
    // Si el usuario no ha dado like
    if (!post.likedByCurrentUser) {
      this.likeService.addLike(this.likeDTO).subscribe(
        resp => {
          post.likedByCurrentUser = true;
          console.log(resp);
          post.likes.push({'like_id': resp.like_id, 'user': this.currentUser, 'liked_at': ''})
        },
        error => console.error('Error al agregar like', error)
      );
    } else {
      // Si el usuario ya dio like, lo elimina
      const likeToRemove = post.likes.find(like => like.user.user_id === this.currentUser.user_id);
      if (likeToRemove) {
        console.log(likeToRemove)
        this.likeService.deleteLike(likeToRemove.like_id).subscribe(
          resp => {
            post.likedByCurrentUser = false;
            // Filtrar para eliminar el like correspondiente
            post.likes = post.likes.filter(like => like.user.user_id !== this.currentUser.user_id);
          },
          error => console.error('Error al eliminar like', error)
        );
      }
    }
  }
  



  calculateTimeAgo(date: string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  }
}
