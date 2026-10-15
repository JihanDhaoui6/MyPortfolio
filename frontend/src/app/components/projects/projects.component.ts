import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  color: string;
  date: string;
  icon: string;
  images: string[];      // ← peut contenir images ET vidéos
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  lightboxProject: Project | null = null;
  lightboxIndex = 0;

  projects: Project[] = [
    {
      id: 1,
      title: 'Plateforme Cloud Privé & Auto-Scaling Intelligent',
      description:
        'Cloud privé OpenStack (Nova, Neutron, Keystone, Heat) avec provisioning Ansible, orchestration Kubernetes et recommandations de scalabilité par Machine Learning.',
      tech: ['OpenStack', 'Ansible', 'Kubernetes', 'Docker', 'Prometheus', 'Grafana'],
      github: 'https://github.com/JihanDhaoui6',
      color: '#a78bc8',
      date: 'Mai 2026',
      icon: '☁️',
      images: [
        'images/openstack/infrakbira.png',
        'images/openstack/topo.png',
        'images/openstack/lkol.png',
        'images/openstack/rizo.png',
        'images/openstack/monotoring.png'
      ]
    },
    {
      id: 2,
      title: 'Plateforme intelligente de gestion du diabète',
      description:
        'Plateforme de suivi du diabète avec suivi médical, conseils nutritionnels et recommandations basées sur l’IA.',
      tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'IA'],
      github: 'https://github.com/JihanDhaoui6',
      color: '#c9b6e0',
      date: 'Mars 2026',
      icon: '🩺',
      images: [
        'images/diacare/role.png',
        'images/diacare/doc.png',
        'images/diacare/doctor.png',
        'images/diacare/nutri.png'
      ]
    },
    {
      id: 3,
      title: 'Détection d’Intrusions Réseau basée sur l’IA',
      description:
        'Pipeline ML complet (classification, clustering, explicabilité) avec K-Means et DBSCAN. Application Flask de détection d’anomalies.',
      tech: ['Python', 'Flask', 'Scikit-learn', 'K-Means', 'DBSCAN'],
      github: 'https://github.com/JihanDhaoui6/ai-intrusion-detection-devsecops',
      color: '#e8b8cc',
      date: 'Nov 2025',
      icon: '🛡️',
      images: [
        'images/sec/home.png',
        'images/sec/param.png',
        'images/intrusion/03.png'
      ]
    },
    {
      id: 4,
      title: 'Plateforme d’échange et de vente de livres',
      description:
        'Application MERN multi-utilisateurs avec messagerie temps réel (WebSocket), tracking des commandes et gestion avancée des annonces.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.IO'],
      github: 'https://github.com/JihanDhaoui6',
      color: '#c8e0d5',
      date: 'Fév 2024',
      icon: '📚',
      images: [
        'images/livre/video.webm'
      ]
    },
    {
      id: 5,
      title: 'Plateforme de gestion de voyages (JavaFX)',
      description:
        'Application desktop JavaFX pour organiser des voyages : logements, voitures, vols, événements. Sécurité et assurance voyage.',
      tech: ['JavaFX', 'Java', 'MySQL', 'XAMPP'],
      github: 'https://github.com/JihanDhaoui6',
      color: '#f5d0c5',
      date: 'Jan 2025',
      icon: '✈️',
      images: [
       
      ]
    },
    {
      id: 6,
      title: 'Plateforme Web de gestion de voyages (Symfony)',
      description:
        'Version web de la plateforme de voyages développée avec Symfony. Réservations multi-services, prix locaux, sécurité.',
      tech: ['Symfony', 'PHP', 'MySQL', 'Twig', 'Doctrine'],
      github: 'https://github.com/JihanDhaoui6',
      color: '#e8f44d',
      date: 'Jan 2025',
      icon: '🌐',
      images: [
       
      ]
    }
  ];

  // =====================================================
  //            DÉTECTION IMAGE / VIDÉO
  // =====================================================
  isVideo(file: string): boolean {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file);
  }

  isImage(file: string): boolean {
    return /\.(png|jpg|jpeg|gif|webp|svg|avif|bmp)$/i.test(file);
  }

  // =====================================================
  //                  LIGHTBOX
  // =====================================================
  openLightbox(project: Project, index = 0): void {
    this.lightboxProject = project;
    this.lightboxIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxProject = null;
    document.body.style.overflow = '';
  }

  nextImage(event?: Event): void {
    event?.stopPropagation();
    if (!this.lightboxProject) return;
    this.lightboxIndex =
      (this.lightboxIndex + 1) % this.lightboxProject.images.length;
  }

  prevImage(event?: Event): void {
    event?.stopPropagation();
    if (!this.lightboxProject) return;
    const len = this.lightboxProject.images.length;
    this.lightboxIndex = (this.lightboxIndex - 1 + len) % len;
  }

  goToImage(index: number, event?: Event): void {
    event?.stopPropagation();
    this.lightboxIndex = index;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.lightboxProject) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
  }
}