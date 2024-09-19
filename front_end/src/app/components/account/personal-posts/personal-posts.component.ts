import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { LoginServiceService } from '../../../services/login-service.service';
import { LikesDTO, Post } from '../../../models/Post';
import { PostServiceService } from '../../../services/post-service.service';
import { AccountComponent } from '../account.component';
import { formatDistanceToNow } from 'date-fns';
import { es, fi } from 'date-fns/locale';
import { LikeService } from '../../../services/like.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-posts',
  standalone: true,
  imports: [AccountComponent, CommonModule],
  templateUrl: './personal-posts.component.html',
  styleUrl: './personal-posts.component.scss'
})
export class PersonalPostsComponent implements OnInit, AfterViewInit {



  activateState: string = 'option1'; // El enlace activo por defecto
  token!: string;
  currentUser!: User;
  posts: Post[] = [];
  likeDTO: LikesDTO;

  constructor(
    private serviceUser: UserService,
    private servicePost: PostServiceService,
    private serviceLogin: LoginServiceService,
    private serviceLike: LikeService
  ){
    this.likeDTO = new LikesDTO();
  }



  // Referencias a los elementos
  @ViewChild('option1') estilo1!: ElementRef;
  @ViewChild('option3') estilo3!: ElementRef;

  ngAfterViewInit() {
   
    // Activar el tab por defecto
    this.stateProfileTabs(this.activateState);
  }


  ngOnInit(): void {
    this.token = this.serviceLogin.token
    console.log(this.token)
    if (this.token) {
      this.loadUser();
    }
  }



  loadUser(): void {
    const payload = this.serviceLogin.getPayload(this.token);
  
    this.serviceUser.findUserByEmail(payload.sub).subscribe(
      value => {
        console.log(value);
        this.currentUser = value;
        this.loadPersonalPosts();  // Mover la llamada a info aquí
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
  

  loadPersonalPosts(){
    console.log(this.currentUser)
    this.servicePost.findPostsByUserId(this.currentUser.user_id).subscribe(value => {
      console.log(value)
      this.posts = value
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map(post => ({
                ...post,
                timeAgo: this.calculateTimeAgo(post.createdAt),
                likedByCurrentUser: post.likes.some(like => like.user.user_id === this.currentUser.user_id),
              }));
      console.log()

    }) 
  }
  calculateTimeAgo(date: string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  }


  changeStateLike(_t11: Post) {
    this.serviceLike.changeStateLike(_t11, this.likeDTO, this.currentUser)
  }






  stateProfileTabs(state: string) {
    // Espera un breve tiempo para asegurarse de que los elementos estén disponibles
    setTimeout(() => {
      // Elimina el estilo de todos los elementos
      this.removeAllActiveStyles();

      // Activa el estilo en el elemento correspondiente
      if (state === 'option1') {
        this.estilo1.nativeElement.classList.add('active');
      } else if (state === 'option3') {
        this.estilo3.nativeElement.classList.add('active');
      }
      // Actualiza el enlace activo
      this.activateState = state;
    }, 0); // El tiempo 0 indica que se ejecutará después de que Angular termine la renderización
  }

  private removeAllActiveStyles() {
    this.estilo1?.nativeElement.classList.remove('active');
    this.estilo3?.nativeElement.classList.remove('active');
  }
}
