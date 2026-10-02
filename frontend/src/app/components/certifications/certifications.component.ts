import { Component } from '@angular/core';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  color: string;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certifications: Certification[] = [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2025',
      url: 'https://aws.amazon.com/certification/',
      color: '#f59e0b'
    },
    {
      name: 'Docker Certified Associate',
      issuer: 'Docker',
      date: '2024',
      color: '#0ea5e9'
    },
    {
      name: 'Kubernetes CKA',
      issuer: 'CNCF',
      date: '2024',
      color: '#8b5cf6'
    }
  ];
}