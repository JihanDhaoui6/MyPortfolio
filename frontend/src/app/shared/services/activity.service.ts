import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivityItem } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  /** 👇 Tes vraies infos */
  private readonly GITHUB_USER = 'JihanDhaoui6';
  private readonly LINKEDIN_URL =
    'https://www.linkedin.com/in/jihan-dhaoui-15599b236/';

  constructor(private http: HttpClient) {}

  // =====================================================
  //      GITHUB — DERNIER COMMIT (temps réel)
  // =====================================================
  getGitHubActivity(): Observable<ActivityItem[]> {
    const reposUrl = `https://api.github.com/users/${this.GITHUB_USER}/repos?sort=pushed&per_page=5`;

    return this.http.get<any[]>(reposUrl).pipe(
      switchMap((repos: any[]) => {
        if (!repos || !repos.length) return of([] as any[]);

        const repo = repos[0];
        const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`;

        return this.http.get<any[]>(commitsUrl).pipe(
          map((commits: any[]) => {
            if (!commits || !commits.length) return [];

            const c = commits[0];
            return [
              {
                repo: repo.name,
                message: c.commit.message.split('\n')[0],
                date: c.commit.author.date,
                sha: c.sha.substring(0, 7),
                url: c.html_url
              }
            ];
          }),
          catchError(() => of([]))
        );
      }),

      map((commits: any[]): ActivityItem[] => {
        if (!commits.length) {
          return [
            {
              type: 'github' as const,
              title: 'Profil GitHub',
              description: 'Retrouve tous mes projets open-source',
              url: `https://github.com/${this.GITHUB_USER}`,
              date: new Date(),
              logo: 'https://cdn.simpleicons.org/github/FFFFFF',
              logoBg: '#181717',
              color: '#a78bc8'
            }
          ];
        }

        const c = commits[0];
        return [
          {
            type: 'github' as const,
            title: `Dernier commit · ${c.repo}`,
            description: `${c.sha} · ${c.message}`,
            url: c.url,
            date: new Date(c.date),
            logo: 'https://cdn.simpleicons.org/github/FFFFFF',
            logoBg: '#181717',
            color: '#a78bc8'
          }
        ];
      }),

      catchError((err) => {
        console.warn('GitHub API error:', err);
        return of([
          {
            type: 'github' as const,
            title: 'Profil GitHub',
            description: 'Retrouve tous mes projets open-source',
            url: `https://github.com/${this.GITHUB_USER}`,
            date: new Date(),
            logo: 'https://cdn.simpleicons.org/github/FFFFFF',
            logoBg: '#181717',
            color: '#a78bc8'
          }
        ]);
      })
    );
  }

  // =====================================================
  //      LINKEDIN — DERNIER POST (statique)
  // =====================================================
  getLinkedInActivity(): Observable<ActivityItem[]> {
    const items: ActivityItem[] = [
      {
        type: 'linkedin' as const,
        title: 'Summer Internship at Dataouine Center — NexusOS',
        description:
          'Lead Infrastructure Security, Containerization & Telemetry Engineer — CI/CD, Docker Compose, Zero Trust, Prometheus & Grafana.',
        url: this.LINKEDIN_URL,
        date: new Date('2026-10-13'), // ← ~2 mois avant maintenant
        logo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        logoBg: '#0A66C2',
        color: '#8fa0d8'
      }
    ];
    return of(items);
  }

  // =====================================================
  //      AGRÉGATION + TEMPS ÉCOULÉ
  // =====================================================
  getAllActivity(): Observable<ActivityItem[]> {
    return forkJoin([
      this.getGitHubActivity(),
      this.getLinkedInActivity()
    ]).pipe(
      map(([gh, li]) => {
        const all: ActivityItem[] = [...gh, ...li];
        all.sort((a, b) => b.date.getTime() - a.date.getTime());
        all.forEach((item: ActivityItem) => {
          item.timeAgo = this.timeAgo(item.date);
        });
        return all;
      })
    );
  }

  // =====================================================
  //      UTILITAIRE — TEMPS ÉCOULÉ
  // =====================================================
  timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return "à l'instant";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `il y a ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `il y a ${days} j`;

    const months = Math.floor(days / 30);
    if (months < 12) return `il y a ${months} mois`;

    const years = Math.floor(months / 12);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }
}