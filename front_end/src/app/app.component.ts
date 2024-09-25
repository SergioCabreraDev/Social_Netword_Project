import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme/theme.service';
import { User } from './models/User';
import { UserService } from './services/user.service';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corregido de styleUrl a styleUrls
})
export class AppComponent implements OnInit {

  token!: string;
  currentUser!: User;
  userForm!: User;
  theme!: string;

  constructor(
    private themeService: ThemeService,
    private serviceUser: UserService,
    private serviceLogin: LoginServiceService
  ) { }

  ngOnInit(): void {    
    this.token = this.serviceLogin.token;
    console.log(this.token);

    if (this.token) {
      this.loadUser();  // Se carga el usuario y el tema se aplicará dentro de esta función
    }
  }

  loadUser(): void {
    const payload = this.serviceLogin.getPayload(this.token);
  
    this.serviceUser.findUserByEmail(payload.sub).subscribe(
      value => {
        console.log(value);
        this.currentUser = value;
        this.userForm = { ...value };  // Copia de currentUser en userForm
        console.log(this.userForm);
        console.log(this.currentUser.config.theme);

        // Asigna el tema y llama al servicio para aplicarlo
        this.theme = this.currentUser.config.theme;
        console.log(`Tema cargado: ${this.theme}`);
        this.themeService.setTheme(this.theme);  // Aplica el tema aquí, después de cargar el usuario
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}
