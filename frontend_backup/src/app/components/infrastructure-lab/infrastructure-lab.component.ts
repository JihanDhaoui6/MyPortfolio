import { Component } from '@angular/core';

@Component({
  selector: 'app-infrastructure-lab',
  templateUrl: './infrastructure-lab.component.html',
  styleUrls: ['./infrastructure-lab.component.css']
})
export class InfrastructureLabComponent {

  labs = [
    {
      icon: '🐧',
      name: 'Linux',
      description: 'System administration and services'
    },
    {
      icon: '🐳',
      name: 'Docker',
      description: 'Containers and Compose environments'
    },
    {
      icon: '⚙',
      name: 'CI/CD',
      description: 'Automation with GitHub Actions'
    },
    {
      icon: '◉',
      name: 'Monitoring',
      description: 'Metrics, logs and observability'
    },
    {
      icon: '🔐',
      name: 'Security',
      description: 'DevSecOps and infrastructure security'
    },
    {
      icon: '☁',
      name: 'Cloud',
      description: 'Cloud architecture and deployment'
    }
  ];

}