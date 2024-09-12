import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PersonalPostsComponent } from './personal-posts/personal-posts.component';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { LoginServiceService } from '../../services/login-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-account',
  standalone: true,
  imports:[PersonalPostsComponent, CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
resetForm() {
throw new Error('Method not implemented.');
}


  
  token!: string;
  currentUser!: User;
  userForm!: User;


  constructor(
    private serviceUser: UserService,
    private serviceLogin: LoginServiceService,
    private router: Router
  ){
    this.currentUser = new User();

  }


  ngOnInit(): void {
    this.token = this.serviceLogin.token
    console.log(this.token)
    if (this.token) {
      this.loadUser();
      this.info();
    }
  }


  loadUser(): void {
    const payload = this.serviceLogin.getPayload(this.token);
  
    this.serviceUser.findUserByEmail(payload.sub).subscribe(
      value => {
        console.log(value);
        this.currentUser = value;
        this.info();  // Mover la llamada a info aquí
        this.userForm = { ...value };  // Copia de currentUser en userForm
        console.log(this.userForm);
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
  
  formUpdate(_t31: NgForm) {
    console.log(this.userForm)
    if(_t31.valid){
      this.closeModal()
      this.serviceUser.updateUser(this.userForm, this.userForm.user_id).subscribe(res =>{
        console.log(res);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/account']);
     
        });
      })
    }
    }

  info(){
    console.log(this.currentUser)
  }

  showModal() {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('show');
    });
    this.userForm = {...this.currentUser}
  }

  closeModal() {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('hide');
    });
  }

}