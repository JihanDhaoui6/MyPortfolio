import { Component } from '@angular/core';

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  tasks: string[];
  color: string;
  icon: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: Experience[] = [
    // 🔹 Ingénieure Infrastructure & DevOps — Freelance
    {
      role: 'Ingénieure Infrastructure & DevOps',
      company: 'Freelance',
      location: 'Remote',
      period: 'Juin — Juil 2026',
      description:
        'Conception d’une infrastructure cloud sécurisée Zero Trust avec conteneurisation et CI/CD.',
      tasks: [
        'Conception d’une infrastructure cloud sécurisée selon le modèle Zero Trust',
        'Conteneurisation avec Docker, orchestration Docker Compose et CI/CD avec GitHub Actions',
        'Déploiement de solutions d’observabilité, de stockage sécurisé et de tests de performance'
      ],
      color: '#a78bc8',
      icon: '☁️'
    },

    // 🔹 Stagiaire Observatrice — CRC Bouchemma
    {
      role: 'Stagiaire Observatrice — Infra Réseaux & Systèmes',
      company: 'CRC Bouchemma',
      location: 'Gabès',
      period: 'Juil 2025',
      description:
        'Découverte des infrastructures réseaux et systèmes au sein du CRC Gabès.',
      tasks: [
        'Découverte des infrastructures électriques et réseaux',
        'Réseaux fibre optique et configuration réseau',
        'Configuration et administration de serveurs Linux',
        'Stockage et communication entre les centres nationaux'
      ],
      color: '#c9b6e0',
      icon: '🌐'
    },

    // 🔹 Stage PFE — Faculté des Sciences de Monastir
    {
      role: 'Stage PFE — Développeuse Full-Stack MERN',
      company: 'Faculté des Sciences de Monastir',
      location: 'Monastir',
      period: 'Jan — Juin 2024',
      description:
        'Conception et développement d’une plateforme d’échange et de vente de livres.',
      tasks: [
        'Architecture multi-utilisateurs (étudiants, vendeurs, admin)',
        'Messagerie temps réel et tracking via WebSocket (Socket.IO)',
        'Fonctionnalités avancées : catalogue, panier, modération, gestion des annonces',
        'Stack : MongoDB · Express · React · Node.js'
      ],
      color: '#e8b8cc',
      icon: '📚'
    },

    // 🔹 Stage d'initialisation — ESSAT Gabès
    {
      role: 'Stage d’initialisation',
      company: 'ESSAT Gabès',
      location: 'Gabès',
      period: 'Juin 2023',
      description:
        'Premier contact avec le monde professionnel de l’informatique.',
      tasks: [
        'Découverte des métiers de l’informatique',
        'Initiation aux infrastructures et environnements techniques',
        'Université privée ESSAT — Gabès'
      ],
      color: '#c8e0d5',
      icon: '🎓'
    }
  ];
}