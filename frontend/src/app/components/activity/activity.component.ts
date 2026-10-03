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
  error: string | null = null;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivity();
  }

  private loadActivity(): void {
    this.activityService.getAllActivity().subscribe({
      next: (items: ActivityItem[]) => {
        this.activities = items;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Impossible de charger l’activité.';
        this.loading = false;
      }
    });
  }
}