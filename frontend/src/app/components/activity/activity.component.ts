import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  activities = [
    {
      platform: 'GitHub',
      icon: '⌘',
      title: 'Latest commit',
      description: 'Portfolio infrastructure and UI development',
      time: 'Recently',
      link: 'https://github.com/'
    },
    {
      platform: 'LinkedIn',
      icon: 'in',
      title: 'Latest post',
      description: 'Cloud / DevOps / DevSecOps engineering content',
      time: 'Recently',
      link: 'https://www.linkedin.com/'
    },
    {
      platform: 'Medium',
      icon: 'M',
      title: 'Latest article',
      description: 'Technical articles and engineering notes',
      time: 'Recently',
      link: 'https://medium.com/'
    }
  ];

}