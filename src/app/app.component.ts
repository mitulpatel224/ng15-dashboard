import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng15-dashboard';
  public theme!: string;

  constructor() {
    // TODO: Filter window's theme
    this.theme = 'light';
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        this.theme = event.matches ? 'dark' : 'light';
      });
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.theme = 'dark';
    }
  }
}
