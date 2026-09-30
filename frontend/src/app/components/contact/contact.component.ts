import { Component } from '@angular/core';

interface ChallengeQuestion {
  question: string;
  hint: string;
  answers: string[]; // réponses acceptées (en minuscule, sans accents/espaces superflus)
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  unlocked = false;
  currentIndex = 0;
  userAnswer = '';
  feedback = '';
  lastCorrect = false;

  confettiPieces = Array.from({ length: 24 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.6
  }));

  questions: ChallengeQuestion[] = [
    {
      question: "Quelle commande Docker permet de lister les conteneurs en cours d'exécution ?",
      hint: "Ça commence par 'docker' et ça se termine en 3 lettres...",
      answers: ['docker ps']
    },
    {
      question: "Quelle commande kubectl affiche les pods du namespace courant ?",
      hint: "kubectl get ...",
      answers: ['kubectl get pods', 'kubectl get pod']
    },
    {
      question: "Quel outil HashiCorp est utilisé pour l'Infrastructure as Code ?",
      hint: "Il partage son nom avec un élément... terrestre.",
      answers: ['terraform']
    }
  ];

  private normalize(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  checkAnswer(): void {
    if (!this.userAnswer.trim()) {
      return;
    }

    const normalized = this.normalize(this.userAnswer);
    const correct = this.questions[this.currentIndex].answers
      .map(a => this.normalize(a))
      .includes(normalized);

    if (correct) {
      this.lastCorrect = true;
      this.feedback = '✅ Correct !';
      this.userAnswer = '';

      setTimeout(() => {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          this.feedback = '';
        } else {
          this.unlocked = true;
        }
      }, 500);
    } else {
      this.lastCorrect = false;
      this.feedback = "❌ Pas tout à fait... réessaie (ou clique sur 'Indice').";
    }
  }

  showHint(): void {
    this.lastCorrect = false;
    this.feedback = `💡 Indice : ${this.questions[this.currentIndex].hint}`;
  }
}