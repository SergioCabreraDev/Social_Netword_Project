import { EmitterComunicationService } from './../../services/emitter-comunication.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss'
})
export class InteractionsComponent implements OnInit {

  constructor(
    private serviceEmitter: EmitterComunicationService
  ){

  }
  ngOnInit(): void {
    this.enviarMensaje();
  }

  @Output() indicateNavBar = new EventEmitter<string>();

  enviarMensaje() {
    this.serviceEmitter.emitterNewStateNav.emit('option3')
  }
}
