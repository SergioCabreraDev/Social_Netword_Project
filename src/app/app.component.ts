import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corregido de styleUrl a styleUrls
})
export class AppComponent implements OnInit {

  activeLink: string = 'option1'; // El enlace activo por defecto

  // Referencias a los elementos
  @ViewChild('option1') estilo1!: ElementRef;
  @ViewChild('option2') estilo2!: ElementRef;
  @ViewChild('option3') estilo3!: ElementRef;
  @ViewChild('option4') estilo4!: ElementRef;
  @ViewChild('option5') estilo5!: ElementRef;

  ngOnInit(): void {
    this.setActive(this.activeLink);
  }

  setActive(link: string) {
    // Elimina el estilo de todos los elementos
    this.estilo1.nativeElement.classList.remove('active');
    this.estilo2.nativeElement.classList.remove('active');
    this.estilo3.nativeElement.classList.remove('active');
    this.estilo4.nativeElement.classList.remove('active');
    this.estilo5.nativeElement.classList.remove('active');

    // Activa el estilo en el elemento correspondiente
    if (link === 'option1') {
      this.estilo1.nativeElement.classList.add('active');
    } else if (link === 'option2') {
      this.estilo2.nativeElement.classList.add('active');
    } else if (link === 'option3') {
      this.estilo3.nativeElement.classList.add('active');
    } else if (link === 'option4') {
      this.estilo4.nativeElement.classList.add('active');
    } else if (link === 'option5') {
      this.estilo5.nativeElement.classList.add('active');
    }
    
    // Actualiza el enlace activo
    this.activeLink = link;
  }
}
