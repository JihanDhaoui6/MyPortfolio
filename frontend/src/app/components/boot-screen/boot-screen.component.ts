import { Component, EventEmitter, Output } from '@angular/core';

interface BootLine {
  text: string;
  type: 'info' | 'success' | 'warning' | 'cmd' | 'dim';
  delay: number;    // durée d'attente avant affichage (ms)
}

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.component.html',
  styleUrls: ['./boot-screen.component.css']
})
export class BootScreenComponent {
  /** Émis quand le boot est terminé */
  @Output() finished = new EventEmitter<void>();

  /** Lignes affichées */
  visibleLines: BootLine[] = [];

  /** Progression (0 à 100) */
  progress = 0;

  /** Phase actuelle */
  currentPhase = 'Initialisation…';

  /** Texte d'état final */
  isFinished = false;

  /** Toutes les lignes de boot */
  private readonly bootSequence: BootLine[] = [
    { text: '$ systemctl start portfolio.service', type: 'cmd', delay: 200 },
    { text: '[ OK ] Loading kernel modules...', type: 'info', delay: 250 },
    { text: '[ OK ] Mounting filesystem...', type: 'info', delay: 200 },
    { text: '[ OK ] Starting Docker daemon...', type: 'info', delay: 300 },
    { text: '[ OK ] Pulling container images...', type: 'info', delay: 280 },
    { text: '[ OK ] Setting up network bridge...', type: 'info', delay: 240 },
    { text: '[ OK ] Establishing TLS/HTTPS...', type: 'info', delay: 260 },
    { text: '[ OK ] Loading Angular runtime...', type: 'info', delay: 220 },
    { text: '[ OK ] Initializing components...', type: 'info', delay: 200 },
    { text: '[ OK ] Fetching activity feed...', type: 'info', delay: 280 },
    { text: '[ OK ] Verifying security policies...', type: 'info', delay: 240 },
    { text: '[WARN] No secrets in environment — using defaults', type: 'warning', delay: 320 },
    { text: '[ OK ] Starting observability hooks...', type: 'info', delay: 220 },
    { text: '[ OK ] All services are running ✔', type: 'success', delay: 260 },
    { text: '$ echo "Welcome to Jihan\'s universe"', type: 'cmd', delay: 300 },
    { text: 'Ready.', type: 'dim', delay: 200 }
  ];

  private currentIndex = 0;
  private progressInterval?: any;

  ngOnInit(): void {
    this.startBootSequence();
  }

  ngOnDestroy(): void {
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  /** Lance la séquence */
  private startBootSequence(): void {
    this.runLine();
    this.runProgress();
  }

  /** Ajoute les lignes une par une */
  private runLine(): void {
    if (this.currentIndex >= this.bootSequence.length) {
      this.completeBoot();
      return;
    }

    const line = this.bootSequence[this.currentIndex];
    this.visibleLines.push(line);
    this.currentPhase = line.text.replace(/^\[ OK \] /, '').replace(/^\[WARN\] /, '');
    this.currentIndex++;

    setTimeout(() => this.runLine(), line.delay);
  }

  /** Anime la barre de progression */
  private runProgress(): void {
    this.progressInterval = setInterval(() => {
      if (this.progress < 100) {
        // Progression fluide avec accélération en début
        const step = this.progress < 60 ? 3 : this.progress < 90 ? 1.5 : 1;
        this.progress = Math.min(this.progress + step, 100);
      } else {
        clearInterval(this.progressInterval);
      }
    }, 80);
  }

  /** Fin du boot → fade out */
  private completeBoot(): void {
    setTimeout(() => {
      this.isFinished = true;

      // Attendre la fin de l'animation fade-out
      setTimeout(() => {
        this.finished.emit();
      }, 700);
    }, 500);
  }
}