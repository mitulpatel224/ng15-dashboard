import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class SidebarComponent implements OnDestroy {
  /** Persist the active theme mode */
  public isDarkMode: boolean = true;

  constructor(private renderer: Renderer2) {
    /** Fetch the active theme mode and set the dark-mode flag */
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      this.isDarkMode = false;
      this.toggleTheme(this.isDarkMode);
    }

    /** Watch over window's theme change */
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleThemeChange);
  }

  /**
   * Handle toggle switch for theme change
   * @param mode boolean
   */
  public toggleTheme(mode: boolean) {
    const body = document.querySelector('body') as any;
    switch (mode) {
      case true:
        this.renderer.setAttribute(body, 'data-theme', 'dark');
        break;

      default:
        this.renderer.setAttribute(body, 'data-theme', 'light');
        break;
    }
  }

  /**
   * Handle windows theme change
   * @param event Theme change event
   */
  public handleThemeChange = (event: any) => {
    this.isDarkMode = event.matches ? true : false;
    this.toggleTheme(this.isDarkMode);
    this.ngOnDestroy();
  };

  ngOnDestroy(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleThemeChange, true);
  }
}
