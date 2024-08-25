import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  activeLink: string = 'option1'; // El enlace activo por defecto

  // Referencias a los elementos
  @ViewChild('option1') estilo1!: ElementRef;
  @ViewChild('option2') estilo2!: ElementRef;
  @ViewChild('option3') estilo3!: ElementRef;
  @ViewChild('option4') estilo4!: ElementRef;
  @ViewChild('option5') estilo5!: ElementRef;

  ngAfterViewInit(): void {
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