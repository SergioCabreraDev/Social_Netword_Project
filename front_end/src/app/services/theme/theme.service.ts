import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setTheme(theme: string){
    document.body.classList.remove('dark-theme', 'light-theme');
    if(theme == 'dark'){
      console.log('theme dark')
      document.body.classList.add('dark-theme');
    }else{
      console.log('theme light')
      document.body.classList.add('light-theme');
    }
  }
}
