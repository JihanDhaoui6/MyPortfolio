import { Component } from '@angular/core';

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  categories: SkillCategory[] = [
    {
      title: 'Cloud',
      icon: '☁️',
      color: '#0ea5e9',
      items: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation']
    },
    {
      title: 'DevOps',
      icon: '⚙️',
      color: '#8b5cf6',
      items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'ArgoCD']
    },
    {
      title: 'DevSecOps',
      icon: '🛡️',
      color: '#10b981',
      items: ['Trivy', 'SonarQube', 'Vault', 'OWASP', 'SAST/DAST']
    },
    {
      title: 'Réseau',
      icon: '🌐',
      color: '#06b6d4',
      items: ['Nginx', 'DNS', 'HTTPS/TLS', 'Firewall', 'VPN']
    },
    {
      title: 'Programmation',
      icon: '💻',
      color: '#f59e0b',
      items: ['Java', 'Spring Boot', 'TypeScript', 'Angular', 'Python']
    },
    {
      title: 'IA & Data',
      icon: '🤖',
      color: '#ec4899',
      items: ['OpenAI API', 'LangChain', 'Pandas', 'MLOps', 'RAG']
    }
  ];
}