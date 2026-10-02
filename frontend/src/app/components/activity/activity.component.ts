import { Component, OnInit } from '@angular/core';
import { ActivityItem } from '../../shared/models/activity.model';
import { ActivityService } from '../../shared/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: ActivityItem[] = [];
  loading = true;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.getAllActivity().subscribe((items) => {
      this.activities = items.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      this.loading = false;
    });
  }
}