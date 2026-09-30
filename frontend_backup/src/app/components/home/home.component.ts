import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  technologies = [
    'Linux',
    'Docker',
    'Cloud',
    'CI/CD',
    'Security',
    'Monitoring'
  ];

}