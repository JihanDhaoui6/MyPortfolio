import { Component } from '@angular/core';

interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {
  certifications: Certification[] = [
    { name: 'Learn Ansible Basics', issuer: 'KodeKloud' },
    { name: 'CCNA 2: Switching, Routing, and Wireless Essentials', issuer: 'Cisco' },
    { name: 'Docker Training Course', issuer: 'KodeKloud' },
    { name: 'Python', issuer: 'freeCodeCamp.org', date: '2022-11-29' },
    { name: 'Fundamentals of Deep Learning', issuer: 'NVIDIA' },
    { name: 'CCNA 1: Introduction to Networks', issuer: 'Cisco' }
  ];
}