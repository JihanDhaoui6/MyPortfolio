import { Component } from '@angular/core';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent {

  certifications = [
    {
      name: 'Cisco Networking',
      organization: 'Cisco',
      category: 'NETWORKING'
    },
    {
      name: 'Cloud Computing',
      organization: 'Academic / Cloud',
      category: 'CLOUD'
    },
    {
      name: 'DevOps',
      organization: 'Technical Training',
      category: 'DEVOPS'
    }
  ];

}