import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  toggleDarkTheme() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('dark-theme');
  }
}
