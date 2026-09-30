import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  experiences = [
    {
      year: '2026',
      title: 'Cloud / DevOps Engineering',
      description:
        'Cloud infrastructure, Docker, CI/CD, monitoring and secure deployment.'
    },
    {
      year: '2026',
      title: 'DevSecOps & Infrastructure',
      description:
        'Security integration, secrets management, vulnerability scanning and observability.'
    },
    {
      year: '2025',
      title: 'Cloud Computing',
      description:
        'Infrastructure, networking, virtualization and cloud architecture.'
    },
    {
      year: '2024',
      title: 'Software Engineering',
      description:
        'Application development, databases, APIs and software engineering fundamentals.'
    }
  ];

}