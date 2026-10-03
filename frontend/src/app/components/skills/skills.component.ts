import { Component } from '@angular/core';

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  icon: string;
  level: SkillLevel;
}

export interface SkillCategory {
  key: string;
  title: string;
  icon: string;
  color: string;
  items: Skill[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  activeFilter = 'all';

  categories: SkillCategory[] = [
    // ===== CLOUD & INFRASTRUCTURE =====
    {
      key: 'cloud',
      title: 'Cloud & Infrastructure',
      icon: '☁️',
      color: '#a78bc8',
      items: [
        { name: 'OpenStack (Nova, Neutron, Keystone, Heat)', icon: '🟣', level: 4 },
        { name: 'AWS (EC2)', icon: '🟠', level: 3 },
        { name: 'Terraform', icon: '🏗️', level: 3 },
        { name: 'KVM', icon: '🖥️', level: 3 }
      ]
    },

    // ===== CONTENEURS & ORCHESTRATION =====
    {
      key: 'containers',
      title: 'Conteneurs & Orchestration',
      icon: '🐳',
      color: '#c9b6e0',
      items: [
        { name: 'Docker', icon: '🐳', level: 5 },
        { name: 'Docker Compose', icon: '📦', level: 4 },
        { name: 'Kubernetes (deploy, services, scaling)', icon: '☸️', level: 4 }
      ]
    },

    // ===== AUTOMATISATION & MONITORING =====
    {
      key: 'automation',
      title: 'Automatisation & Monitoring',
      icon: '⚙️',
      color: '#e8b8cc',
      items: [
        { name: 'Ansible', icon: '🔴', level: 4 },
        { name: 'Jenkins', icon: '🤵', level: 3 },
        { name: 'Prometheus', icon: '🔥', level: 3 },
        { name: 'Grafana', icon: '📊', level: 3 },
        { name: 'OpenTelemetry', icon: '🔭', level: 3 }
      ]
    },

    // ===== CI/CD & VERSIONING =====
    {
      key: 'cicd',
      title: 'CI/CD & Versioning',
      icon: '🚀',
      color: '#e8f44d',
      items: [
        { name: 'Git', icon: '🌿', level: 5 },
        { name: 'GitHub', icon: '🐙', level: 5 },
        { name: 'GitHub Actions', icon: '⚡', level: 4 },
        { name: 'Jira', icon: '📋', level: 4 }
      ]
    },

    // ===== DEVSECOPS =====
    {
      key: 'devsecops',
      title: 'DevSecOps',
      icon: '🛡️',
      color: '#c8e0d5',
      items: [
        { name: 'SonarQube', icon: '🔍', level: 2 },
        { name: 'Trivy', icon: '🐚', level: 3 }
      ]
    },

    // ===== RÉSEAU & SERVICE MESH =====
    {
      key: 'networking',
      title: 'Réseau & Service Mesh',
      icon: '🌐',
      color: '#8fa0d8',
      items: [
        { name: 'Traefik', icon: '🚦', level: 3 },
        { name: 'Ingress (Nginx, K8s)', icon: '🚪', level: 3 },
        { name: 'Nginx', icon: '🟩', level: 4 },
        { name: 'DNS', icon: '📡', level: 3 },
        { name: 'HTTPS / TLS', icon: '🔐', level: 4 },
        { name: 'Pare-feu / Firewall', icon: '🧱', level: 3 },
        { name: 'cisco packet tracer', icon: '🛡️', level: 3 }
      ]
    },

    // ===== PROGRAMMATION & FRAMEWORKS =====
    {
      key: 'code',
      title: 'Programmation & Frameworks',
      icon: '💻',
      color: '#f5d0c5',
      items: [
        { name: 'Python', icon: '🐍', level: 5 },
        { name: 'Java', icon: '☕', level: 4 },
        { name: 'Bash', icon: '🐚', level: 4 },
        { name: 'PowerShell', icon: '💠', level: 3 },
        { name: 'C / C++', icon: '⚡', level: 3 },
        { name: 'Spring Boot', icon: '🍃', level: 4 },
        { name: 'Angular', icon: '🅰️', level: 4 },
        { name: 'Node.js', icon: '🟢', level: 4 },
        { name: 'Express.js', icon: '🚂', level: 4 },
        { name: 'React', icon: '⚛️', level: 3 },
        { name: 'Symfony', icon: '🎼', level: 3 },
        { name: 'JavaFX', icon: '🖼️', level: 3 }
      ]
    },

    // ===== BASES DE DONNÉES =====
    {
      key: 'data',
      title: 'Bases de données',
      icon: '🗄️',
      color: '#d4af83',
      items: [
        { name: 'PostgreSQL', icon: '🐘', level: 4 },
        { name: 'MySQL', icon: '🐬', level: 4 },
        { name: 'MariaDB', icon: '🦭', level: 4 },
        { name: 'MongoDB', icon: '🍃', level: 4 },
        { name: 'SQL', icon: '🗃️', level: 5 }
      ]
    },

    // ===== SYSTÈMES D'EXPLOITATION =====
    {
      key: 'os',
      title: 'Systèmes d\'exploitation',
      icon: '🐧',
      color: '#c8e0d5',
      items: [
        { name: 'Linux (Debian, AlmaLinux, Kali)', icon: '🐧', level: 5 },
        { name: 'Windows', icon: '🪟', level: 4 }
      ]
    },

    // ===== VIRTUALISATION =====
    {
      key: 'virtualization',
      title: 'Virtualisation',
      icon: '🖥️',
      color: '#c9b6e0',
      items: [
        { name: 'VMware', icon: '🟦', level: 3 },
        { name: 'VirtualBox', icon: '📦', level: 4 },
        { name: 'Vagrant', icon: '🎁', level: 3 },
        { name: 'KVM', icon: '⚙️', level: 3 }
      ]
    },

    // ===== FORMATS & OUTILS =====
    {
      key: 'formats',
      title: 'Formats & Outils',
      icon: '📄',
      color: '#e8b8cc',
      items: [
        { name: 'YAML', icon: '📝', level: 5 },
        { name: 'JSON', icon: '🔖', level: 5 },
        { name: 'Markdown', icon: '📖', level: 5 }
      ]
    }
  ];

  get filters(): { key: string; label: string; icon: string }[] {
    return [
      { key: 'all', label: 'Tout', icon: '✨' },
      ...this.categories.map((c) => ({
        key: c.key,
        label: c.title,
        icon: c.icon
      }))
    ];
  }

  get visibleCategories(): SkillCategory[] {
    if (this.activeFilter === 'all') return this.categories;
    return this.categories.filter((c) => c.key === this.activeFilter);
  }

  get totalSkills(): number {
    return this.categories.reduce((sum, c) => sum + c.items.length, 0);
  }

  selectFilter(key: string): void {
    this.activeFilter = key;
  }

  levelDots(level: SkillLevel): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }

  levelLabel(level: SkillLevel): string {
    const labels = ['', 'Notions', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
    return labels[level] || '';
  }
}