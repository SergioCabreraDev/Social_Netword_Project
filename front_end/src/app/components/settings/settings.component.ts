import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {


  selectedOption: any = 'dark';

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private service: LoginServiceService,
    private themeService: ThemeService
  ){}
  
  
  logout() {
  this.service.logout()
  this.router.navigate(['/login']);
  }


  addValue(arg0: string) {
    this.themeService.setTheme(arg0);
 
    }
  
  
  }

