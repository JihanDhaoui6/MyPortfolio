import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

interface Line {
  text: string;
  type: 'cmd' | 'out' | 'err' | 'ok';
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

  private readonly commands: Record<string, () => Line[]> = {
    help: () => [
      { text: 'Commandes disponibles :', type: 'out' },
      { text: '  whoami      → Présentation rapide', type: 'out' },
      { text: '  skills      → Liste des compétences', type: 'out' },
      { text: '  stack       → Stack technique', type: 'out' },
      { text: '  certs       → Certifications', type: 'out' },
      { text: '  contact     → Comment me joindre', type: 'out' },
      { text: '  clear       → Effacer le terminal', type: 'out' }
    ],
    whoami: () => [
      { text: '> Jihan Dhaoui — Cloud & DevOps Engineer', type: 'ok' },
      { text: '> Passionné d’infrastructure, de sécurité et d’IA.', type: 'out' }
    ],
    skills: () => [
      { text: 'Cloud       : AWS, Azure, GCP, Terraform', type: 'ok' },
      { text: 'DevOps      : Docker, Kubernetes, CI/CD', type: 'ok' },
      { text: 'DevSecOps   : Trivy, Vault, SonarQube', type: 'ok' },
      { text: 'IA          : OpenAI API, LangChain, RAG', type: 'ok' }
    ],
    stack: () => [
      { text: 'Frontend  : Angular, TypeScript', type: 'out' },
      { text: 'Backend   : Spring Boot, Java 21', type: 'out' },
      { text: 'Database  : PostgreSQL', type: 'out' },
      { text: 'Infra     : Docker, Nginx, GitHub Actions', type: 'out' }
    ],
    certs: () => [
      { text: '☁️  AWS Cloud Practitioner', type: 'ok' },
      { text: '🐳 Docker Certified Associate', type: 'ok' },
      { text: '☸️  Kubernetes CKA', type: 'ok' }
    ],
    contact: () => [
      { text: 'Email     : contact@ton-domaine.dev', type: 'ok' },
      { text: 'LinkedIn  : linkedin.com/in/ton-profil', type: 'out' },
      { text: 'GitHub    : github.com/ton-user', type: 'out' }
    ]
  };

  ngAfterViewInit(): void {
    this.printBoot();
    setTimeout(() => this.termInput?.nativeElement.focus(), 200);
  }

  private printBoot(): void {
    this.lines = [
      { text: 'Welcome to my interactive portfolio!', type: 'ok' },
      { text: "Type 'help' to list available commands.", type: 'out' },
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
        this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
        this.currentInput = this.history[this.historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.historyIndex = Math.max(this.historyIndex - 1, -1);
      this.currentInput = this.historyIndex === -1 ? '' : this.history[this.historyIndex];
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
        text: `command not found: ${raw}. Try 'help'.`,
        type: 'err'
      });
    }
    this.lines.push({ text: '', type: 'out' });

    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.termBody) {
        this.termBody.nativeElement.scrollTop = this.termBody.nativeElement.scrollHeight;
      }
    }, 0);
  }

  focusInput(): void {
    this.termInput?.nativeElement.focus();
  }
}