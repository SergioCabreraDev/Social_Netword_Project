import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterComunicationService {

  constructor() { }

  private _emitterNewStateNav: EventEmitter<any> = new EventEmitter();

  get emitterNewStateNav() {
    return this._emitterNewStateNav;
  }
}
