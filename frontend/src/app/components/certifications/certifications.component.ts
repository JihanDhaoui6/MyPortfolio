import { Component } from '@angular/core';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  color: string;
  icon: string;
  category: 'cloud' | 'devops' | 'network' | 'ia' | 'programming';
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certifications: Certification[] = [
    // ===== 2026 =====
    {
      name: 'AWS Academy Cloud Operations',
      issuer: 'Amazon Web Services',
      date: '10/2026',
      url: 'https://aws.amazon.com/certification/',
      color: '#f59e0b',
      icon: '☁️',
      category: 'cloud'
    },
    {
      name: 'Fundamentals of Deep Learning',
      issuer: 'NVIDIA',
      date: '04/2026',
      color: '#10b981',
      icon: '🤖',
      category: 'ia'
    },
    {
      name: 'Learn Ansible Basics',
      issuer: 'KodeKloud',
      date: '02/2026',
      color: '#a78bc8',
      icon: '⚙️',
      category: 'devops'
    },
    {
      name: 'Docker Training Course',
      issuer: 'KodeKloud',
      date: '02/2026',
      color: '#0ea5e9',
      icon: '🐳',
      category: 'devops'
    },

    // ===== 2025 =====
    {
      name: 'CCNA 2 : Switching, Routing & Wireless Essentials',
      issuer: 'Cisco',
      date: '05/2025',
      color: '#8fa0d8',
      icon: '🌐',
      category: 'network'
    },
    {
      name: 'CCNA 1 : Introduction to Networks',
      issuer: 'Cisco',
      date: '05/2025',
      color: '#c9b6e0',
      icon: '📡',
      category: 'network'
    },

    // ===== 2022 =====
    {
      name: 'Python',
      issuer: 'freeCodeCamp.org',
      date: '11/2022',
      url: 'https://www.freecodecamp.org/certification/',
      color: '#e8b8cc',
      icon: '🐍',
      category: 'programming'
    }
  ];

  /** Compteur par catégorie */
  get totalCerts(): number {
    return this.certifications.length;
  }
}