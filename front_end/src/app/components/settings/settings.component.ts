import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private service: LoginServiceService
  ){}
  
  
  logout() {
  this.service.logout()
  this.router.navigate(['/login']);

  }
  
  }

