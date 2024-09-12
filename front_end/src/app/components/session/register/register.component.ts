import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: any ={
    email: '',
    username: '',
    password: ''
  }

  button: boolean = false;

  constructor(
   private service: UserService,
   private router: Router
  ){}

formSend(formInfo: any) {
  if(formInfo.valid){
    this.button = true;
    console.log(this.user)
    this.service.createUser(this.user).subscribe(response =>
    {
      console.log(response)

      this.user = {
        email: '',
        username: '',
        password: ''
      }
      this.router.navigate(['/login']);
    }
    )
  }
  this.button = false;


}

 

}
