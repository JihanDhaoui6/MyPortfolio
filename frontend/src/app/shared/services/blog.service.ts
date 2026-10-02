import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      title: 'Pipeline CI/CD pour Angular + Spring Boot avec GitHub Actions',
      excerpt:
        'Construire un pipeline qui build, teste et déploie automatiquement ton portfolio.',
      content:
        'Dans cet article, nous allons construire un pipeline GitHub Actions complet : build Angular, tests Spring Boot, images Docker et déploiement sur VPS. Nous couvrons aussi les secrets, la mise en cache des dépendances et les health checks.',
      tags: ['CI/CD', 'GitHub Actions', 'Docker'],
      date: new Date('2026-09-01'),
      readTime: 6,
      color: '#0ea5e9'
    },
    {
      id: 2,
      title: 'Sécuriser son portfolio : HTTPS, isolation réseau et rate limiting',
      excerpt:
        'Bonnes pratiques DevSecOps appliquées à un projet personnel.',
      content:
        'Nous voyons pourquoi PostgreSQL ne doit jamais être exposé, comment configurer Nginx en reverse proxy HTTPS, et comment limiter les abus sur un formulaire de contact.',
      tags: ['DevSecOps', 'Nginx', 'HTTPS'],
      date: new Date('2026-08-15'),
      readTime: 5,
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'Intégrer un assistant IA dans un portfolio Angular',
      excerpt:
        'Chatbot, suggestions de lecture, résumé automatique de blog…',
      content:
        'Un portfolio moderne peut intégrer une couche IA : suggestions d’articles, résumé automatique, chatbot qui répond aux visiteurs. Nous verrons comment appeler une API IA depuis Spring Boot et consommer le flux dans Angular.',
      tags: ['IA', 'Angular', 'Spring Boot'],
      date: new Date('2026-07-20'),
      readTime: 8,
      color: '#10b981'
    }
  ];

  getAll(): Observable<BlogPost[]> {
    return of(this.posts);
  }

  getById(id: number): Observable<BlogPost | undefined> {
    return of(this.posts.find((p) => p.id === id));
  }
}