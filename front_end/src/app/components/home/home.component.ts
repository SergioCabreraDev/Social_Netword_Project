import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PublicationComponent } from './publication/publication.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { PostServiceService } from '../../services/post-service.service';
import { User } from '../../models/User';
import { Post } from '../../models/Post';
declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicationComponent, CommonModule, FormsModule, PublicationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  token!: string;
  username!: string;
  files: File[] = [];
  idUser!: number;
  currentUser!: User;
  post: Post;

  constructor(
    private service: LoginServiceService,
    private serviceUser: UserService,
    private servicePost: PostServiceService
  ) {
    this.post = new Post();
  }

  ngOnInit(): void {
    // Obtener el token al inicializar el componente
    this.token = this.service.token;

    if (this.token) {
      this.loadUser();
    }
  }

  loadUser(): void {
    const payload = this.parseJwt(this.token);
    this.username = payload.username;

    this.serviceUser.findUserByEmail(payload.sub).subscribe(
      value => {
        this.currentUser = value;
        this.handleUserLoaded();
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  handleUserLoaded() {
    console.log('Usuario actual cargado:', this.currentUser);
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }


  resetForm() {
    this.post = new Post();
  }

  newPost(postForm: NgForm) {
    if (postForm.valid) {
      console.log(this.post);
      this.servicePost.createPost(this.post, this.currentUser.user_id).subscribe(res => {
        console.log(res);
        this.post = new Post();
        this.closeModal();
      });
    }
  }

  showModal() {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('show');
    });
  }

  closeModal() {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('hide');
    });
  }
}
