import { Component } from '@angular/core';
import { PublicationComponent } from './publication/publication.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
