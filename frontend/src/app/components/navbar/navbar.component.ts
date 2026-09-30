import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuOpen = false;

  darkMode = false;

  language = 'EN';

  // Temporary value.
  // Later this will come from the backend.
  visitorCount = Math.floor(Math.random() * 500) + 1000;


  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }


  closeMenu(): void {
    this.menuOpen = false;
  }


  toggleLanguage(): void {

    this.language = this.language === 'EN'
      ? 'FR'
      : 'EN';

  }


  toggleTheme(): void {

    this.darkMode = !this.darkMode;

    document.body.classList.toggle(
      'dark-mode',
      this.darkMode
    );

  }

}