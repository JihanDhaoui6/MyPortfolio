import { Component } from '@angular/core';

interface Project {
  year: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects: Project[] = [

    {
      year: '2026',
      title: 'NexusOS',
      category: 'Cloud Infrastructure / DevSecOps',
      description:
        'Secure and observable infrastructure for a real-time SaaS platform.',
      technologies: [
        'Docker',
        'Traefik',
        'GitHub Actions',
        'Prometheus',
        'Grafana'
      ]
    },

    {
      year: '2026',
      title: 'My Portfolio',
      category: 'Cloud / DevOps',
      description:
        'Personal engineering portfolio built with Angular and Spring Boot.',
      technologies: [
        'Angular',
        'Spring Boot',
        'PostgreSQL',
        'Docker',
        'Nginx'
      ]
    },

    {
      year: '2025',
      title: 'Networking Lab',
      category: 'Network Administration',
      description:
        'Cisco networking laboratories covering routing, SSH, NTP and monitoring.',
      technologies: [
        'Cisco',
        'Packet Tracer',
        'SSH',
        'NTP',
        'Syslog'
      ]
    }

  ];

}