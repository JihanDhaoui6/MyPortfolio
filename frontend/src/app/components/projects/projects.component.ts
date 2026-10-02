import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  color: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Portfolio Cloud-Native',
      description:
        'Site personnel full-stack déployé avec Docker, Nginx, HTTPS et pipeline CI/CD GitHub Actions.',
      tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'Nginx'],
      github: 'https://github.com/ton-user/portfolio',
      demo: 'https://ton-domaine.dev',
      color: '#0ea5e9'
    },
    {
      title: 'Plateforme d’observabilité',
      description:
        'Stack Prometheus + Grafana + Loki pour superviser des microservices Kubernetes.',
      tech: ['Kubernetes', 'Prometheus', 'Grafana', 'Helm'],
      github: 'https://github.com/ton-user/observability',
      color: '#8b5cf6'
    },
    {
      title: 'Assistant IA DevOps',
      description:
        'Chatbot qui analyse les logs et suggère des remédiations automatiques via un LLM.',
      tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
      github: 'https://github.com/ton-user/ai-devops',
      color: '#10b981'
    }
  ];
}