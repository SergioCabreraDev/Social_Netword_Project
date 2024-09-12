import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { response } from 'express';
import { LoginServiceService } from '../../../services/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  credentials: Credentials;

  constructor(
    private service: LoginServiceService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ){
    this.credentials = {
      email: '',
      password: ''
    }
  }

  formSend(formInfo: any) {
    console.log(formInfo.value);
    if(formInfo.valid){
      this.service.login(this.credentials).subscribe(response =>{
          this.router.navigate(['/home']);
      })
    }
    }




}


