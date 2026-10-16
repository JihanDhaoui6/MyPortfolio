import { Component } from '@angular/core';

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  logo: string;         // ← URL du logo réel
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

  /** 🎨 Base URL des logos Devicon (colored SVG) */
  private readonly DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
  /** 🎨 Base URL des logos Simple Icons */
  private readonly SI = 'https://cdn.simpleicons.org';

  categories: SkillCategory[] = [
    // ===== CLOUD & INFRASTRUCTURE =====
    {
      key: 'cloud',
      title: 'Cloud & Infrastructure',
      icon: '☁️',
      color: '#a78bc8',
      items: [
        { name: 'OpenStack', logo: `${this.DI}/openstack/openstack-original.svg`, level: 4 },
        { name: 'AWS (EC2)', logo: `${this.DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`, level: 3 },
        { name: 'Terraform', logo: `${this.DI}/terraform/terraform-original.svg`, level: 3 },
        { name: 'KVM', logo: `${this.SI}/linux`, level: 3 }
      ]
    },

    // ===== CONTENEURS & ORCHESTRATION =====
    {
      key: 'containers',
      title: 'Conteneurs & Orchestration',
      icon: '🐳',
      color: '#c9b6e0',
      items: [
        { name: 'Docker', logo: `${this.DI}/docker/docker-original.svg`, level: 5 },
        { name: 'Docker Compose', logo: `${this.DI}/docker/docker-original.svg`, level: 4 },
        { name: 'Kubernetes', logo: `${this.DI}/kubernetes/kubernetes-plain.svg`, level: 4 }
      ]
    },

    // ===== AUTOMATISATION & MONITORING =====
    {
      key: 'automation',
      title: 'Automatisation & Monitoring',
      icon: '⚙️',
      color: '#e8b8cc',
      items: [
        { name: 'Ansible', logo: `${this.DI}/ansible/ansible-original.svg`, level: 4 },
        { name: 'Jenkins', logo: `${this.DI}/jenkins/jenkins-original.svg`, level: 3 },
        { name: 'Prometheus', logo: `${this.DI}/prometheus/prometheus-original.svg`, level: 3 },
        { name: 'Grafana', logo: `${this.DI}/grafana/grafana-original.svg`, level: 3 },
        { name: 'OpenTelemetry', logo: `${this.SI}/opentelemetry`, level: 3 }
      ]
    },

    // ===== CI/CD & VERSIONING =====
    {
      key: 'cicd',
      title: 'CI/CD & Versioning',
      icon: '🚀',
      color: '#e8f44d',
      items: [
        { name: 'Git', logo: `${this.DI}/git/git-original.svg`, level: 5 },
        { name: 'GitHub', logo: `${this.DI}/github/github-original.svg`, level: 5 },
        { name: 'GitHub Actions', logo: `${this.DI}/githubactions/githubactions-original.svg`, level: 4 },
        { name: 'Jira', logo: `${this.DI}/jira/jira-original.svg`, level: 4 }
      ]
    },

    // ===== DEVSECOPS =====
    {
      key: 'devsecops',
      title: 'DevSecOps',
      icon: '🛡️',
      color: '#c8e0d5',
      items: [
        { name: 'SonarQube', logo: `${this.DI}/sonarqube/sonarqube-original.svg`, level: 2 },
        { name: 'Trivy', logo: `${this.SI}/trivy`, level: 3 }
      ]
    },

    // ===== RÉSEAU & SERVICE MESH =====
    {
      key: 'networking',
      title: 'Réseau & Service Mesh',
      icon: '🌐',
      color: '#8fa0d8',
      items: [
        { name: 'Traefik', logo: `${this.SI}/traefikproxy`, level: 3 },
        { name: 'Nginx', logo: `${this.DI}/nginx/nginx-original.svg`, level: 4 },
        { name: 'Ingress', logo: `${this.DI}/kubernetes/kubernetes-plain.svg`, level: 3 },
        { name: 'DNS', logo: `${this.SI}/cloudflare`, level: 3 },
        { name: 'HTTPS / TLS', logo: `${this.SI}/letsencrypt`, level: 4 },
        { name: 'Pare-feu', logo: `${this.SI}/pfsense`, level: 3 },
        { name: 'Cisco Packet Tracer', logo: `${this.DI}/cisco/cisco-original.svg`, level: 3 }
      ]
    },

    // ===== PROGRAMMATION & FRAMEWORKS =====
    {
      key: 'code',
      title: 'Programmation & Frameworks',
      icon: '💻',
      color: '#f5d0c5',
      items: [
        { name: 'Python', logo: `${this.DI}/python/python-original.svg`, level: 5 },
        { name: 'Java', logo: `${this.DI}/java/java-original.svg`, level: 4 },
        { name: 'Bash', logo: `${this.DI}/bash/bash-original.svg`, level: 4 },
        { name: 'PowerShell', logo: `${this.SI}/powershell`, level: 3 },
        { name: 'C / C++', logo: `${this.DI}/cplusplus/cplusplus-original.svg`, level: 3 },
        { name: 'Spring Boot', logo: `${this.DI}/spring/spring-original.svg`, level: 4 },
        { name: 'Angular', logo: `${this.DI}/angularjs/angularjs-original.svg`, level: 4 },
        { name: 'Node.js', logo: `${this.DI}/nodejs/nodejs-original.svg`, level: 4 },
        { name: 'Express.js', logo: `${this.DI}/express/express-original.svg`, level: 4 },
        { name: 'React', logo: `${this.DI}/react/react-original.svg`, level: 3 },
        { name: 'Symfony', logo: `${this.DI}/symfony/symfony-original.svg`, level: 3 },
        { name: 'JavaFX', logo: `${this.DI}/java/java-original.svg`, level: 3 }
      ]
    },

    // ===== BASES DE DONNÉES =====
    {
      key: 'data',
      title: 'Bases de données',
      icon: '🗄️',
      color: '#d4af83',
      items: [
        { name: 'PostgreSQL', logo: `${this.DI}/postgresql/postgresql-original.svg`, level: 4 },
        { name: 'MySQL', logo: `${this.DI}/mysql/mysql-original.svg`, level: 4 },
        { name: 'MariaDB', logo: `${this.DI}/mariadb/mariadb-original.svg`, level: 4 },
        { name: 'MongoDB', logo: `${this.DI}/mongodb/mongodb-original.svg`, level: 4 },
        { name: 'SQL', logo: `${this.DI}/microsoftsqlserver/microsoftsqlserver-plain.svg`, level: 5 }
      ]
    },

    // ===== SYSTÈMES D'EXPLOITATION =====
    {
      key: 'os',
      title: 'Systèmes d\'exploitation',
      icon: '🐧',
      color: '#c8e0d5',
      items: [
        { name: 'Linux', logo: `${this.DI}/linux/linux-original.svg`, level: 5 },
        { name: 'Windows', logo: `${this.DI}/windows8/windows8-original.svg`, level: 4 }
      ]
    },

    // ===== VIRTUALISATION =====
    {
      key: 'virtualization',
      title: 'Virtualisation',
      icon: '🖥️',
      color: '#c9b6e0',
      items: [
        { name: 'VMware', logo: `${this.SI}/vmware`, level: 3 },
        { name: 'VirtualBox', logo: `${this.DI}/virtualbox/virtualbox-original.svg`, level: 4 },
        { name: 'Vagrant', logo: `${this.DI}/vagrant/vagrant-original.svg`, level: 3 },
        { name: 'KVM', logo: `${this.SI}/linux`, level: 3 }
      ]
    },

    // ===== FORMATS & OUTILS =====
    {
      key: 'formats',
      title: 'Formats & Outils',
      icon: '📄',
      color: '#e8b8cc',
      items: [
        { name: 'YAML', logo: `${this.SI}/yaml`, level: 5 },
        { name: 'JSON', logo: `${this.SI}/json`, level: 5 },
        { name: 'Markdown', logo: `${this.DI}/markdown/markdown-original.svg`, level: 5 }
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

  /** Gestion d'erreur si un logo ne charge pas */
  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '0.3';
  }
}