import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corregido de styleUrl a styleUrls
})
export class AppComponent {

 
}
