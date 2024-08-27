import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  activeLink: string = ''; // El enlace activo por defecto

  // Referencias a los elementos
  @ViewChild('option1') estilo1!: ElementRef;
  @ViewChild('option2') estilo2!: ElementRef;
  @ViewChild('option3') estilo3!: ElementRef;
  @ViewChild('option4') estilo4!: ElementRef;
  @ViewChild('option5') estilo5!: ElementRef;
  @ViewChild('option6') estilo6!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detecta la ruta activa en la carga inicial
    const currentRoute = this.router.url;
    this.setActive(currentRoute);
  }

  ngAfterViewInit(): void {
    // Suscripción a eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.setActive(currentRoute);
      }
    });
  }

  setActive(route: string) {
    // Espera un breve tiempo para asegurarse de que los elementos estén disponibles
    setTimeout(() => {
      // Elimina el estilo de todos los elementos
      this.removeAllActiveStyles();

      // Activa el estilo en el elemento correspondiente
      if (route === '/home') {
        this.estilo1.nativeElement.classList.add('active');
      } else if (route === '/interactions') {
        this.estilo2.nativeElement.classList.add('active');
      } else if (route === '/search') {
        this.estilo3.nativeElement.classList.add('active');
      } else if (route === '/account') {
        this.estilo4.nativeElement.classList.add('active');
      } else if (route === '/settings') {
        this.estilo5.nativeElement.classList.add('active');
      } else if (route === '/messaging') {
        this.estilo6.nativeElement.classList.add('active');
      }

      // Actualiza el enlace activo
      this.activeLink = route;
    }, 0); // El tiempo 0 indica que se ejecutará después de que Angular termine la renderización
  }

  private removeAllActiveStyles() {
    this.estilo1?.nativeElement.classList.remove('active');
    this.estilo2?.nativeElement.classList.remove('active');
    this.estilo3?.nativeElement.classList.remove('active');
    this.estilo4?.nativeElement.classList.remove('active');
    this.estilo5?.nativeElement.classList.remove('active');
    this.estilo6?.nativeElement.classList.remove('active');
  }
}
