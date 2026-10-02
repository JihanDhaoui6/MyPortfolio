import { Component } from '@angular/core';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      role: 'Cloud / DevOps Engineer',
      company: 'Entreprise X',
      period: '2024 — Présent',
      description:
        'Automatisation des déploiements, migration cloud, mise en place de pipelines CI/CD sécurisés.',
      color: '#0ea5e9'
    },
    {
      role: 'Full-Stack Developer',
      company: 'Entreprise Y',
      period: '2022 — 2024',
      description:
        'Développement d’applications Angular + Spring Boot, containerisation Docker.',
      color: '#8b5cf6'
    },
    {
      role: 'Stage DevSecOps',
      company: 'Entreprise Z',
      period: '2022',
      description:
        'Intégration de scanners de sécurité (Trivy, SonarQube) dans la chaîne CI.',
      color: '#10b981'
    }
  ];
}