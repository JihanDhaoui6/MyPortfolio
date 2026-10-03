import { Component, OnInit } from '@angular/core';
import { CareerEntry } from '../../shared/models/career/career.module';

@Component({
  selector: 'app-career-line',
  templateUrl: './career-line.component.html',
  styleUrls: ['./career-line.component.css']
})
export class CareerLineComponent implements OnInit {
  readonly startYear = 2021;
  readonly endYear = 2026;

  years: number[] = [];

  entries: CareerEntry[] = [
    // ===== WORK =====

    // 🔹 Ingénieure Infrastructure & DevOps — Freelance
    {
      id: 1,
      type: 'work',
      title: 'Ingénieure Infrastructure & DevOps',
      organization: 'Freelance',
      location: 'Remote',
      startDate: '2026-06',
      endDate: '2026-07',
      color: '#8fa0d8',
      description: [
        'Conception d’une infrastructure cloud sécurisée Zero Trust',
        'Conteneurisation Docker + Docker Compose + CI/CD GitHub Actions',
        'Observabilité, stockage sécurisé et tests de performance'
      ]
    },

    // 🔹 Stagiaire Observatrice — CRC Bouchemma
    {
      id: 2,
      type: 'work',
      title: 'Stagiaire Observatrice — Infra Réseaux & Systèmes',
      organization: 'CRC Bouchemma',
      location: 'Gabès',
      startDate: '2025-07',
      endDate: '2025-07',
      color: '#ff6b00',
      description: [
        'Découverte des infrastructures électriques et réseaux (CRC Gabès)',
        'Réseaux fibre optique et configuration réseau',
        'Configuration et administration de serveurs Linux',
        'Stockage et systèmes de communication inter-centres'
      ]
    },

    // 🔹 Stage PFE — Faculté des Sciences de Monastir
    {
      id: 3,
      type: 'work',
      title: 'Stage PFE — Développeuse Full-Stack MERN',
      organization: 'Faculté des Sciences de Monastir',
      location: 'Monastir',
      startDate: '2024-01',
      endDate: '2024-06',
      color: '#a78bc8',
      description: [
        'Conception et développement d’une plateforme d’échange et de vente de livres',
        'Architecture multi-utilisateurs (étudiants, vendeurs, admin)',
        'Messagerie temps réel et tracking de commandes via WebSocket',
        'Stack : MongoDB · Express · React · Node.js (MERN) · Socket.IO'
      ]
    },

    // 🔹 Stage d'initialisation — ESSAT Gabès
    {
      id: 4,
      type: 'work',
      title: 'Stage d’initialisation',
      organization: 'ESSAT Gabès',
      location: 'Gabès',
      startDate: '2023-06',
      endDate: '2023-06',
      color: '#c8e0d5',
      description: [
        'Premier contact avec le monde professionnel',
        'Découverte des métiers de l’informatique et des infrastructures',
        'Université privée ESSAT — Gabès'
      ]
    },

    // ===== STUDY =====

    // 🔹 Cycle d'ingénieur — ESPRIT
    {
      id: 5,
      type: 'study',
      title: 'Cycle d’ingénieur — Cloud Computing (2ᵉ année)',
      organization: 'ESPRIT',
      location: 'Ariana',
      startDate: '2024-09',
      endDate: 'now',
      color: '#f9dfc6',
      description: [
        'École Supérieure Privée d’Ingénierie et de Technologies',
        'Spécialisation Cloud Computing'
      ]
    },

    // 🔹 Licence Informatique — FSM
    {
      id: 6,
      type: 'study',
      title: 'Licence Informatique — Génie Logiciel',
      organization: 'Faculté des Sciences de Monastir',
      location: 'Monastir',
      startDate: '2021-09',
      endDate: '2024-06',
      color: '#d4af83',
      description: [
        'Formation en développement logiciel',
        'Bases solides en algorithmique, réseaux, systèmes'
      ]
    }
  ];

  workEntries: CareerEntry[] = [];
  studyEntries: CareerEntry[] = [];
  activeEntry: CareerEntry | null = null;
  tooltipX = 0;

  ngOnInit(): void {
    for (let y = this.startYear; y <= this.endYear; y++) {
      this.years.push(y);
    }

    this.entries.forEach((e) => this.computePosition(e));

    this.workEntries = this.entries
      .filter((e) => e.type === 'work')
      .sort((a, b) => a.left! - b.left!);

    this.studyEntries = this.entries
      .filter((e) => e.type === 'study')
      .sort((a, b) => a.left! - b.left!);
  }

  private computePosition(entry: CareerEntry): void {
    const totalMonths = (this.endYear - this.startYear) * 12 + 12;

    const [sy, sm] = entry.startDate.split('-').map(Number);
    const startMonths = (sy - this.startYear) * 12 + (sm - 1);

    let endMonths: number;
    if (entry.endDate === 'now') {
      endMonths = totalMonths;
    } else {
      const [ey, em] = entry.endDate.split('-').map(Number);
      endMonths = (ey - this.startYear) * 12 + (em - 1);
    }

    const widthMonths = Math.max(endMonths - startMonths + 1, 2);

    entry.left = (startMonths / totalMonths) * 100;
    entry.width = (widthMonths / totalMonths) * 100;
  }

  yearPosition(year: number): number {
    const totalMonths = (this.endYear - this.startYear) * 12 + 12;
    const months = (year - this.startYear) * 12;
    return (months / totalMonths) * 100;
  }

  showTooltip(entry: CareerEntry): void {
    this.activeEntry = entry;
  }

  hideTooltip(): void {
    this.activeEntry = null;
  }
}