import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jihan Dhaoui — Portfolio';

  /** État du boot screen */
  bootDone = false;

  /** Appelé quand l'écran de boot termine */
  onBootFinished(): void {
    this.bootDone = true;
  }
}