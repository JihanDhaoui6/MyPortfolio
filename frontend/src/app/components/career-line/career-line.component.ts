import { Component, OnInit } from '@angular/core';
import { CareerEntry } from '../../shared/models/career/career.module';

@Component({
  selector: 'app-career-line',
  templateUrl: './career-line.component.html',
  styleUrls: ['./career-line.component.css']
})
export class CareerLineComponent implements OnInit {
  /** Bornes de la timeline */
  readonly startYear = 2021;
  readonly endYear = 2026;

  /** Années affichées sous la timeline */
  years: number[] = [];

  /** Toutes les entrées */
  entries: CareerEntry[] = [
    // ===== WORK =====
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

    // ===== STUDY =====
    {
      id: 3,
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
    {
      id: 4,
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

  /** Regroupés par type pour l'affichage */
  workEntries: CareerEntry[] = [];
  studyEntries: CareerEntry[] = [];

  /** Info-bulle active */
  activeEntry: CareerEntry | null = null;
  tooltipX = 0;

  ngOnInit(): void {
    // Années affichées
    for (let y = this.startYear; y <= this.endYear; y++) {
      this.years.push(y);
    }

    // Calcul position + largeur de chaque barre
    this.entries.forEach((e) => this.computePosition(e));

    // Séparation work / study
    this.workEntries = this.entries
      .filter((e) => e.type === 'work')
      .sort((a, b) => a.left! - b.left!);

    this.studyEntries = this.entries
      .filter((e) => e.type === 'study')
      .sort((a, b) => a.left! - b.left!);
  }

  /** Convertit startDate/endDate en % sur la ligne */
  private computePosition(entry: CareerEntry): void {
    const totalMonths =
      (this.endYear - this.startYear) * 12 + 12; // 2021 → 2026 inclus

    const [sy, sm] = entry.startDate.split('-').map(Number);
    const startMonths = (sy - this.startYear) * 12 + (sm - 1);

    let endMonths: number;
    if (entry.endDate === 'now') {
      endMonths = totalMonths;
    } else {
      const [ey, em] = entry.endDate.split('-').map(Number);
      endMonths = (ey - this.startYear) * 12 + (em - 1);
    }

    // Au moins 2 mois de largeur pour la visibilité
    const widthMonths = Math.max(endMonths - startMonths + 1, 2);

    entry.left = (startMonths / totalMonths) * 100;
    entry.width = (widthMonths / totalMonths) * 100;
  }

  /** Année en % pour positionner les labels sous la timeline */
  yearPosition(year: number): number {
    const totalMonths = (this.endYear - this.startYear) * 12 + 12;
    const months = (year - this.startYear) * 12;
    return (months / totalMonths) * 100;
  }

  /** Affiche le tooltip au survol */
  showTooltip(entry: CareerEntry): void {
    this.activeEntry = entry;
  }

  hideTooltip(): void {
    this.activeEntry = null;
  }
}