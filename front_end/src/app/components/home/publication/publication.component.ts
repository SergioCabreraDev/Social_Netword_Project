import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { PostServiceService } from '../../../services/post-service.service';
import { Post } from '../../../models/Post';
import { formatDistanceToNow } from 'date-fns';
import { es, fi } from 'date-fns/locale';
import { interval, Subscription } from 'rxjs';
import { takeWhile, startWith } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-publication',
  standalone: true,
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



  constructor(private servicePost: PostServiceService, @Inject(PLATFORM_ID) private platformId: Object) {}

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

 

        // Actualiza la lista de posts
        this.posts = res
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map(post => ({
            ...post,
            timeAgo: this.calculateTimeAgo(post.createdAt)
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





  calculateTimeAgo(date: string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  }
}
