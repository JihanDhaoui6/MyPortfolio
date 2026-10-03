import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivityItem } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  /** 👇 Tes vraies infos */
  private readonly GITHUB_USER = 'JihanDhaoui6';
  private readonly LINKEDIN_URL = 'https://www.linkedin.com/in/jihan-dhaoui-15599b236/';
  private readonly MEDIUM_USER = 'jihandhaoui65';

  constructor(private http: HttpClient) {}

  // =====================================================
  //                GITHUB — API PUBLIQUE (temps réel)
  // =====================================================
   // =====================================================
  //                GITHUB — API PUBLIQUE + FALLBACK
  // =====================================================
   // =====================================================
  //                GITHUB — COMMITS RÉCENTS
  // =====================================================
    // =====================================================
  //      GITHUB — DERNIÈRE ACTION (commit / merge / repo)
  // =====================================================
  getGitHubActivity(): Observable<ActivityItem[]> {
    const reposUrl = `https://api.github.com/users/${this.GITHUB_USER}/repos?sort=pushed&per_page=5`;
    const profileUrl = `https://github.com/${this.GITHUB_USER}`;

    return this.http.get<any[]>(reposUrl).pipe(
      switchMap((repos: any[]) => {
        if (!repos || !repos.length) {
          return of([] as any[]);
        }

        // Prend le repo le plus récemment poussé
        const repo = repos[0];
        const commitsUrl = `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`;

        return this.http.get<any[]>(commitsUrl).pipe(
          map((commits: any[]) => {
            if (!commits || !commits.length) return [];

            const c = commits[0];
            return [
              {
                repo: repo.name,
                repoUrl: repo.html_url,
                language: repo.language,
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
          // Fallback : lien vers le profil
          return [
            {
              type: 'github' as const,
              title: 'Profil GitHub',
              description: 'Retrouve tous mes projets open-source',
              url: profileUrl,
              date: new Date(),
              icon: '🐙',
              color: '#a78bc8'
            }
          ];
        }

        const c = commits[0];
        return [
          {
            type: 'github' as const,
            title: `Dernier commit sur ${c.repo}`,
            description: `${c.sha} · ${c.message}`,
            url: c.url,
            date: new Date(c.date),
            icon: '🐙',
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
            url: profileUrl,
            date: new Date(),
            icon: '🐙',
            color: '#a78bc8'
          }
        ]);
      })
    );
  }
  // =====================================================
  //                LINKEDIN — MANUEL
  // =====================================================
  /**
   * LinkedIn bloque les appels directs.
   * 👉 Mets à jour tes derniers posts ici manuellement.
   */
    // =====================================================
  //                LINKEDIN — MANUEL
  // =====================================================
  /**
   * LinkedIn bloque les appels directs depuis un navigateur.
   * 👉 Mets à jour tes derniers posts ici manuellement.
   */
  getLinkedInActivity(): Observable<ActivityItem[]> {
    const items: ActivityItem[] = [
      {
        type: 'linkedin' as const,
        title: 'OpenStack · Kubernetes · Cloud Computing',
        description:
          'Retour d’expérience sur mon projet de cloud privé et l’orchestration Kubernetes.',
        url: 'https://www.linkedin.com/posts/jihan-dhaoui-15599b236_openstack-kubernetes-cloudcomputing-ugcPost-7459705913218801664-Izet/',
        date: new Date('2026-06-01'),        // ← ~4 mois avant maintenant
        icon: '💼',
        color: '#8fa0d8'
      }
    ];
    return of(items);
  }
  // =====================================================
  //                MEDIUM — RSS VIA PROXY
  // =====================================================
    // =====================================================
  //                MEDIUM — MANUEL (le RSS bloque)
  // =====================================================
  /**
   * Medium renvoie 403 sur le RSS public.
   * 👉 Mets à jour tes derniers articles ici manuellement.
   */
  getMediumActivity(): Observable<ActivityItem[]> {
    const items: ActivityItem[] = [
      {
        type: 'medium' as const,
        title: 'Prompt Injection in CI/CD Pipelines — GitHub Actions Issue (PromptPwnd)',
        description:
          'Analyse d’une faille de prompt injection dans les pipelines CI/CD GitHub Actions.',
        url: 'https://medium.com/ai-in-plain-english/prompt-injection-in-ci-cd-pipelines-github-actions-issue-promptpwnd-77346b8cd5cc',
        date: new Date('2026-09-15'),        // ← à ajuster selon la date réelle
        icon: '✍️',
        color: '#e8b8cc'
      }
    ];
    return of(items);
  }
  // =====================================================
  //                AGRÉGATION + TEMPS ÉCOULÉ
  // =====================================================
  getAllActivity(): Observable<ActivityItem[]> {
    return forkJoin([
      this.getGitHubActivity(),
      this.getLinkedInActivity(),
      this.getMediumActivity()
    ]).pipe(
      map(([gh, li, md]) => {
        const all = [...gh, ...li, ...md];
        all.sort((a, b) => b.date.getTime() - a.date.getTime());
        all.forEach((item) => (item.timeAgo = this.timeAgo(item.date)));
        return all;
      })
    );
  }

  // =====================================================
  //                UTILITAIRE — TEMPS ÉCOULÉ
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