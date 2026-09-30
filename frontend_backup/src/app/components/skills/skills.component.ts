import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skillGroups = [
    {
      icon: '🌐',
      title: 'Networking',
      skills: ['Cisco', 'Routing & Switching', 'VLAN', 'TCP/IP']
    },
    {
      icon: '☁️',
      title: 'Cloud',
      skills: ['AWS', 'Azure', 'Virtualisation']
    },
    {
      icon: '⚙️',
      title: 'DevOps',
      skills: ['Docker', 'Git', 'CI/CD', 'Linux']
    },
    {
      icon: '💻',
      title: 'Développement',
      skills: ['Angular', 'TypeScript', 'Node.js']
    }
  ];

}