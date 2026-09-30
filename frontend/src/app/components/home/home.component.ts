import { Component } from '@angular/core';

interface TerminalEntry {
  command: string;
  output: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentCommand = '';
  history: TerminalEntry[] = [];

  private commands: Record<string, string> = {
    help:
      'Commandes disponibles:\n' +
      '  about     -> qui je suis\n' +
      '  skills    -> mes compétences\n' +
      '  projects  -> voir mes projets\n' +
      '  contact   -> me contacter\n' +
      '  clear     -> nettoyer le terminal',
    about:
      'Jihan Dhaoui — Cloud & DevOps Engineer basée en Tunisie.\n' +
      'Passionnée par l\'Infrastructure as Code, Kubernetes et le cloud.',
    skills:
      'AWS, Azure, Kubernetes, Terraform, Docker, Ansible, CI/CD, Spring Boot, Angular.',
    projects:
      'Retrouve mes projets dans la section "Projects" du menu.',
    contact:
      'Email: contact@jihandhaoui.dev\n' +
      'LinkedIn: linkedin.com/in/jihandhaoui\n' +
      'GitHub: github.com/jihandhaoui'
  };

  runCommand(): void {
    const raw = this.currentCommand.trim();
    if (!raw) {
      return;
    }

    const key = raw.toLowerCase();

    if (key === 'clear') {
      this.history = [];
      this.currentCommand = '';
      return;
    }

    const output = this.commands[key] ?? `Commande introuvable: ${raw}. Tape 'help' pour la liste.`;

    this.history.push({ command: raw, output });
    this.currentCommand = '';
  }
}