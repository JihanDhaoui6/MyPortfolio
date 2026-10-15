import { Component } from '@angular/core';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  logo: string;         // ← URL du logo
  logoBg: string;       // ← couleur de fond du badge (si logo blanc)
  url: string;          // ← lien vers LinkedIn (commun à tous)
  color: string;
  category: 'cloud' | 'devops' | 'network' | 'ia' | 'programming';
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  /** 🔗 Lien vers ta page LinkedIn certifications */
  readonly linkedInCertsUrl =
    'https://www.linkedin.com/in/jihan-dhaoui-15599b236/details/certifications/';

  certifications: Certification[] = [
    // ===== 2026 =====
    {
      name: 'AWS Academy Cloud Operations',
      issuer: 'Amazon Web Services',
      date: '10/2026',
      logo: 'https://cdn.simpleicons.org/amazonaws/FFFFFF',
      logoBg: '#FF9900',
      url: this.linkedInCertsUrl,
      color: '#f59e0b',
      category: 'cloud'
    },
    {
      name: 'Fundamentals of Deep Learning',
      issuer: 'NVIDIA',
      date: '04/2026',
      logo: 'https://cdn.simpleicons.org/nvidia/FFFFFF',
      logoBg: '#76B900',
      url: this.linkedInCertsUrl,
      color: '#10b981',
      category: 'ia'
    },
    {
      name: 'Learn Ansible Basics',
      issuer: 'KodeKloud',
      date: '02/2026',
      logo: 'https://cdn.simpleicons.org/ansible/FFFFFF',
      logoBg: '#EE0000',
      url: this.linkedInCertsUrl,
      color: '#a78bc8',
      category: 'devops'
    },
    {
      name: 'Docker Training Course',
      issuer: 'KodeKloud',
      date: '02/2026',
      logo: 'https://cdn.simpleicons.org/docker/FFFFFF',
      logoBg: '#2496ED',
      url: this.linkedInCertsUrl,
      color: '#0ea5e9',
      category: 'devops'
    },

    // ===== 2025 =====
    {
      name: 'CCNA 2 : Switching, Routing & Wireless Essentials',
      issuer: 'Cisco',
      date: '05/2025',
      logo: 'https://cdn.simpleicons.org/cisco/FFFFFF',
      logoBg: '#1BA0D7',
      url: this.linkedInCertsUrl,
      color: '#8fa0d8',
      category: 'network'
    },
    {
      name: 'CCNA 1 : Introduction to Networks',
      issuer: 'Cisco',
      date: '05/2025',
      logo: 'https://cdn.simpleicons.org/cisco/FFFFFF',
      logoBg: '#1BA0D7',
      url: this.linkedInCertsUrl,
      color: '#c9b6e0',
      category: 'network'
    },

    // ===== 2022 =====
    {
      name: 'Python',
      issuer: 'freeCodeCamp.org',
      date: '11/2022',
      logo: 'https://cdn.simpleicons.org/freecodecamp/FFFFFF',
      logoBg: '#0A0A23',
      url: this.linkedInCertsUrl,
      color: '#e8b8cc',
      category: 'programming'
    }
  ];

  get totalCerts(): number {
    return this.certifications.length;
  }

  /** Gestion d'erreur si un logo ne charge pas */
  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}