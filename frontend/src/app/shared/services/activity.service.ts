import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivityItem } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private githubUser = 'TON_USERNAME_GITHUB';

  constructor(private http: HttpClient) {}

  getGitHubActivity(): Observable<ActivityItem[]> {
    return this.http
      .get<any[]>(`https://api.github.com/users/${this.githubUser}/events/public`)
      .pipe(
        map((events) =>
          events
            .filter((e) => e.type === 'PushEvent')
            .slice(0, 2)
            .map((e) => ({
              type: 'github' as const,
              title: `Push → ${e.repo.name}`,
              description: `${e.payload.commits?.length || 0} commit(s)`,
              url: `https://github.com/${e.repo.name}`,
              date: new Date(e.created_at),
              icon: '🐙',
              color: '#8b5cf6'
            }))
        ),
        catchError(() => of([]))
      );
  }

  getLinkedInActivity(): Observable<ActivityItem[]> {
    return of([
      {
        type: 'linkedin',
        title: 'Dernier post LinkedIn',
        description: 'Partage tes articles et réflexions Cloud/DevOps',
        url: 'https://linkedin.com/in/ton-profil',
        date: new Date(),
        icon: '💼',
        color: '#0ea5e9'
      }
    ]);
  }

  getMediumActivity(): Observable<ActivityItem[]> {
    return of([
      {
        type: 'medium',
        title: 'Dernier article Medium',
        description: 'Retours d’expérience Cloud & IA',
        url: 'https://medium.com/@ton-profil',
        date: new Date(),
        icon: '✍️',
        color: '#10b981'
      }
    ]);
  }

  getAllActivity(): Observable<ActivityItem[]> {
    return forkJoin([
      this.getGitHubActivity(),
      this.getLinkedInActivity(),
      this.getMediumActivity()
    ]).pipe(map(([gh, li, md]) => [...gh, ...li, ...md]));
  }
}