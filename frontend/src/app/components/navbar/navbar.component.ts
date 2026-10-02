import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileOpen = false;
  activeSection = 'hero';
  visits = 0;

  links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifs' },
    { id: 'experience', label: 'Experience' },
    { id: 'activity', label: 'Activity' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  ngOnInit(): void {
    this.visits = this.getVisitCount();
    this.observeSections();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isMobileOpen = false;
    }
  }

  /**
   * Nombre de visites :
   * - Si un compteur existe déjà dans localStorage → on l'incrémente
   * - Sinon on démarre à un nombre aléatoire entre 4000 et 8000
   * Totalement statique côté backend.
   */
  private getVisitCount(): number {
    const key = 'portfolio_visits';
    const stored = localStorage.getItem(key);

    if (stored) {
      const next = parseInt(stored, 10) + 1;
      localStorage.setItem(key, next.toString());
      return next;
    }

    const seed = Math.floor(Math.random() * 4000) + 4000; // 4000–8000
    localStorage.setItem(key, seed.toString());
    return seed;
  }

  private observeSections(): void {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.activeSection = entry.target.id;
          });
        },
        { threshold: 0.35 }
      );
      document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    }, 400);
  }
}