import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isLight = false;

  constructor() {
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light') {
      this.isLight = true;
      document.body.classList.add('light-theme');
    }
  }

  toggleTheme(): void {
    this.isLight = !this.isLight;

    document.body.classList.toggle(
      'light-theme',
      this.isLight
    );

    localStorage.setItem(
      'portfolio-theme',
      this.isLight ? 'light' : 'dark'
    );
  }

  isLightTheme(): boolean {
    return this.isLight;
  }
}