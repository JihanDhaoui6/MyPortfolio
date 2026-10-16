import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

interface Line {
  text: string;
  type: 'cmd' | 'out' | 'err' | 'ok' | 'info' | 'warn';
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('termBody') termBody!: ElementRef<HTMLDivElement>;
  @ViewChild('termInput') termInput!: ElementRef<HTMLInputElement>;

  lines: Line[] = [];
  currentInput = '';
  history: string[] = [];
  historyIndex = -1;

  /** 🎲 Messages d'accueil dynamiques — un est choisi au hasard à l'ouverture */
  private readonly welcomeVariations = [
    {
      greeting: 'Bienvenue sur mon portfolio interactif ! ',
      tip: "Tapez 'help' pour découvrir toutes les commandes disponibles."
    },
    {
      greeting: 'Hey ! Ravi de vous voir ici ',
      tip: "Explorez mon univers Cloud & DevOps — tapez 'help' pour commencer."
    },
    {
      greeting: 'Bienvenue dans mon terminal interactif ',
      tip: "Essayez 'neofetch' pour découvrir mon profil, ou 'help' pour la liste complète."
    },
    {
      greeting: 'Hello, moi c’est Jihan ',
      tip: "Tapez 'help' pour naviguer, ou 'sudo hire-me' si vous êtes recruteur "
    },
    {
      greeting: 'Bienvenue ! Ce terminal est 100% interactif ',
      tip: "Commandes utiles : 'whoami', 'skills', 'projects' — ou 'help' pour tout voir."
    }
  ];

  /** 🎲 Astuces dynamiques */
  private readonly tips = [
    'Astuce : flèches ↑/↓ pour l’historique des commandes.',
    'Astuce : Tab complète automatiquement les commandes.',
    'Astuce : tapez "clear" pour nettoyer l’écran.',
    'Astuce : "sudo hire-me" cache un easter egg 👀'
  ];

  /** Toutes les commandes disponibles */
  private readonly commands: Record<string, () => Line[]> = {

    // ============================================
    //   AIDE
    // ============================================
    help: () => [
      { text: '┌─ Commandes disponibles ─────────────────────', type: 'info' },
      { text: '│  whoami       → Présentation rapide', type: 'out' },
      
      { text: '│  skills       → Compétences techniques', type: 'out' },
      { text: '│  stack        → Stack full-stack', type: 'out' },
      { text: '│  projects     → Projets réalisés', type: 'out' },
      { text: '│  certs        → Certifications', type: 'out' },
      { text: '│  experience   → Parcours professionnel', type: 'out' },
     
    
      { text: '│  sudo hire-me → 👀', type: 'out' },
      { text: '│  contact      → Me joindre', type: 'out' },
      { text: '│  clear        → Effacer', type: 'out' },
      { text: '└─────────────────────────────────────────────', type: 'info' }
    ],

    // ============================================
    //   IDENTITÉ
    // ============================================
    whoami: () => [
      { text: '> Jihan Dhaoui', type: 'ok' },
      { text: '> Cloud & DevOps Engineer | DevSecOps Practitioner', type: 'out' },
      { text: '> "Automate everything that can be automated."', type: 'info' }
    ],

    // ============================================
    //   NEOFETCH
    // ============================================
    neofetch: () => [
      { text: '        ▄▄▄▄▄▄▄        jihan@cloud-resume', type: 'ok' },
      { text: '      ▄█████████▄      ────────────────────', type: 'ok' },
      { text: '     █████████████     OS      : Cloud Native Linux', type: 'out' },
      { text: '    ███████████████    Host    : Jihan Dhaoui', type: 'out' },
      { text: '    ███████████████    Kernel  : DevOps 6.x', type: 'out' },
      { text: '    ███████████████    Uptime  : 3+ years learning', type: 'out' },
      { text: '     █████████████     Shell   : zsh + oh-my-zsh', type: 'out' },
      { text: '      ▀█████████▀      Cloud   : AWS · Azure · GCP', type: 'out' },
      { text: '        ▀▀▀▀▀▀▀        IaC     : Terraform · Ansible', type: 'out' },
      { text: '                       Conteneurs : Docker · K8s', type: 'out' },
      { text: '                       CI/CD   : GitHub Actions · GitLab CI', type: 'out' },
      { text: '                       Security: Trivy · Vault · OWASP', type: 'out' },
      { text: '                       IA      : LangChain · OpenAI API', type: 'out' }
    ],

    // ============================================
    //   SKILLS
    // ============================================
    skills: () => [
      { text: '╭─ Compétences techniques ─────────────────╮', type: 'info' },
      { text: '│  Cloud       : AWS · Azure · GCP · Terraform', type: 'ok' },
      { text: '│  DevOps      : Docker · Kubernetes · ArgoCD', type: 'ok' },
      { text: '│  CI/CD       : GitHub Actions · Jenkins · GitLab', type: 'ok' },
      { text: '│  DevSecOps   : Trivy · Vault · SonarQube · OWASP', type: 'ok' },
      { text: '│  Observabilité : Prometheus · Grafana · Loki', type: 'ok' },
      { text: '│  Réseau      : Nginx · DNS · HTTPS/TLS · VPN', type: 'ok' },
      { text: '│  Programmation : Java · Spring Boot · TypeScript · Python', type: 'ok' },
      { text: '│  IA          : OpenAI API · LangChain · RAG', type: 'ok' },
      { text: '╰──────────────────────────────────────────╯', type: 'info' }
    ],

    // ============================================
    //   STACK
    // ============================================
    stack: () => [
      { text: '> Frontend  : Angular 17 · TypeScript', type: 'out' },
      { text: '> Backend   : Spring Boot · Java 21', type: 'out' },
      { text: '> Base      : PostgreSQL · Redis', type: 'out' },
      { text: '> Infra     : Docker · Nginx · GitHub Actions', type: 'out' },
      { text: '> Cloud     : AWS (VPS, S3, EC2, IAM)', type: 'out' }
    ],

    // ============================================
    //   PROJETS
    // ============================================
    projects: () => [
      { text: '╭─ Projets phares ─────────────────────────╮', type: 'info' },
      { text: '│   Portfolio Cloud-Native', type: 'ok' },
      { text: '│     Angular · Spring Boot · Docker · Nginx', type: 'out' },
      { text: '│     → github.com/JihanDhaoui6', type: 'out' },
      { text: '│', type: 'out' },
      { text: '│    AI Intrusion Detection (DevSecOps)', type: 'ok' },
      { text: '│     Python · ML · RAG · CI/CD sécurisé', type: 'out' },
      { text: '│', type: 'out' },
      { text: '│    CKA 2026 Preparation', type: 'ok' },
      { text: '│     Kubernetes · Helm · ArgoCD', type: 'out' },
      { text: '╰──────────────────────────────────────────╯', type: 'info' }
    ],

    // ============================================
    //   CERTIFICATIONS
    // ============================================
    certs: () => [
      { text: '>  AWS Cloud Practitioner', type: 'ok' },
      { text: '>  Certified Kubernetes Administrator (en cours)', type: 'ok' },
      { text: '>  Docker Certified Associate', type: 'ok' },
      { text: '>  Red Hat Certified System Administrator', type: 'ok' }
    ],

    // ============================================
    //   EXPÉRIENCE
    // ============================================
    experience: () => [
      { text: '> [2026-06 → 2026-07] Ingénieure Infrastructure & DevOps', type: 'ok' },
      { text: '    Zero Trust · Docker · GitHub Actions · Observabilité', type: 'out' },
      { text: '', type: 'out' },
      { text: '> [2025-07] Stagiaire Observatrice — CRC Bouchemma', type: 'ok' },
      { text: '    Réseaux fibre · Linux · Stockage', type: 'out' }
    ],

    // ============================================
    //   DOCKER
    // ============================================
    'docker ps': () => [
      { text: 'CONTAINER ID   IMAGE                    STATUS         PORTS', type: 'info' },
      { text: 'a1b2c3d4e5f6   portfolio-frontend       Up 3 hours     80/tcp', type: 'out' },
      { text: 'b2c3d4e5f6a1   portfolio-backend        Up 3 hours     8080/tcp', type: 'out' },
      { text: 'c3d4e5f6a1b2   postgres:16              Up 3 hours     5432/tcp', type: 'out' },
      { text: 'd4e5f6a1b2c3   nginx:alpine             Up 3 hours     443/tcp', type: 'out' }
    ],

    // ============================================
    //   KUBECTL
    // ============================================
    'kubectl get pods': () => [
      { text: 'NAME                          READY   STATUS    RESTARTS   AGE', type: 'info' },
      { text: 'portfolio-frontend-7d8c9b    1/1     Running   0          3h', type: 'out' },
      { text: 'portfolio-backend-5f6a7b     1/1     Running   0          3h', type: 'out' },
      { text: 'postgres-statefulset-0       1/1     Running   0          3h', type: 'out' },
      { text: 'prometheus-server-0          1/1     Running   0          3h', type: 'out' },
      { text: 'grafana-8a9b0c               1/1     Running   0          3h', type: 'out' }
    ],

    // ============================================
    //   TERRAFORM
    // ============================================
    'terraform plan': () => [
      { text: 'Refreshing Terraform state in-memory prior to plan...', type: 'out' },
      { text: '', type: 'out' },
      { text: 'Terraform will perform the following actions:', type: 'info' },
      { text: '', type: 'out' },
      { text: '  + aws_instance.portfolio_vps', type: 'ok' },
      { text: '      instance_type = "t3.medium"', type: 'out' },
      { text: '  + aws_security_group.portfolio_sg', type: 'ok' },
      { text: '      ingress  = [22, 80, 443]', type: 'out' },
      { text: '  + aws_s3_bucket.portfolio_assets', type: 'ok' },
      { text: '', type: 'out' },
      { text: 'Plan: 3 to add, 0 to change, 0 to destroy.', type: 'info' }
    ],

    // ============================================
    //   HTOP
    // ============================================
    htop: () => [
      { text: '  1  [██████████████░░░░░░]  72%   nginx', type: 'out' },
      { text: '  2  [██████████░░░░░░░░░░]  48%   spring-boot', type: 'out' },
      { text: '  3  [████████████████░░░░]  81%   postgres', type: 'out' },
      { text: '  4  [██░░░░░░░░░░░░░░░░░░]  12%   prometheus', type: 'out' },
      { text: '', type: 'out' },
      { text: '  Mem  : [████████████░░░░░░░░]  58%   4.2G / 8G', type: 'out' },
      { text: '  Tasks: 143 total, 2 running, 141 sleeping', type: 'info' }
    ],

    // ============================================
    //   CURL HEALTH
    // ============================================
    'curl /api/health': () => [
      { text: 'HTTP/1.1 200 OK', type: 'ok' },
      { text: 'Content-Type: application/json', type: 'out' },
      { text: '', type: 'out' },
      { text: '{', type: 'out' },
      { text: '  "status": "UP",', type: 'ok' },
      { text: '  "db": "UP",', type: 'ok' },
      { text: '  "diskSpace": "UP"', type: 'ok' },
      { text: '}', type: 'out' }
    ],

    // ============================================
    //   SUDO HIRE-ME
    // ============================================
    'sudo hire-me': () => [
      { text: ' Vérification des permissions...', type: 'out' },
      { text: ' Accès root accordé', type: 'ok' },
      { text: '', type: 'out' },
      { text: ' Excellente décision !', type: 'ok' },
      { text: 'Jihan est prête à rejoindre votre équipe Cloud/DevOps.', type: 'ok' },
      { text: '', type: 'out' },
      { text: '→ Envoyez-moi un message : jihandhaoui65@gmail.com', type: 'info' }
    ],

    // ============================================
    //   CONTACT
    // ============================================
    contact: () => [
      { text: '>  Email     : jihandhaoui65@gmail.com', type: 'ok' },
      { text: '>  LinkedIn  : linkedin.com/in/jihan-dhaoui-15599b236', type: 'out' },
      { text: '>  GitHub    : github.com/JihanDhaoui6', type: 'out' }
    ]
  };

  ngAfterViewInit(): void {
    this.printBoot();
    setTimeout(() => this.termInput?.nativeElement.focus(), 200);
    // ⚠️ Plus d'auto-exécution de neofetch
  }

  /** 🎲 Génère un message d'accueil dynamique */
  private printBoot(): void {
    const welcome =
      this.welcomeVariations[
        Math.floor(Math.random() * this.welcomeVariations.length)
      ];
    const tip = this.tips[Math.floor(Math.random() * this.tips.length)];

    this.lines = [
      { text: welcome.greeting, type: 'ok' },
      { text: welcome.tip, type: 'out' },
      { text: tip, type: 'info' },
      { text: '', type: 'out' }
    ];
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.execute(this.currentInput.trim());
      this.currentInput = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.history.length) {
        this.historyIndex = Math.min(
          this.historyIndex + 1,
          this.history.length - 1
        );
        this.currentInput = this.history[this.historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.historyIndex = Math.max(this.historyIndex - 1, -1);
      this.currentInput =
        this.historyIndex === -1 ? '' : this.history[this.historyIndex];
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const partial = this.currentInput.toLowerCase();
      if (!partial) return;
      const match = Object.keys(this.commands).find((c) =>
        c.startsWith(partial)
      );
      if (match) this.currentInput = match;
    }
  }

  private execute(raw: string): void {
    if (!raw) return;

    this.history.unshift(raw);
    this.historyIndex = -1;

    this.lines.push({ text: `jihan@cloud-resume:~$ ${raw}`, type: 'cmd' });

    if (raw === 'clear') {
      this.lines = [];
      return;
    }

    const cmd = this.commands[raw.toLowerCase()];
    if (cmd) {
      this.lines.push(...cmd());
    } else {
      this.lines.push({
        text: `commande introuvable : ${raw}. Tapez 'help'.`,
        type: 'err'
      });
    }
    this.lines.push({ text: '', type: 'out' });

    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.termBody) {
        this.termBody.nativeElement.scrollTop =
          this.termBody.nativeElement.scrollHeight;
      }
    }, 0);
  }

  focusInput(): void {
    this.termInput?.nativeElement.focus();
  }
}