import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  // TODO: Handle F11 for fullscreenEnabled flag
  // TODO: Show Help popover
  // TODO: Show setting popover

  @Input() public cardTitle!: string;
  @Input() public enableFullscreen: boolean = true;
  @Input() public enableSetting: boolean = true;

  private fullscreenEnabled: boolean = false;

  public toggleFullscreen(elem: any) {
    if (this.fullscreenEnabled) {
      this.closeFullscreen();
    } else {
      this.openFullscreen(elem);
    }
  }

  private openFullscreen(elem: any) {
    this.fullscreenEnabled = true;
    if (elem?.requestFullscreen) {
      elem?.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem?.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem?.msRequestFullscreen();
    }
  }

  private closeFullscreen() {
    this.fullscreenEnabled = false;
    const elem = document as any;
    if (elem?.exitFullscreen) {
      elem?.exitFullscreen();
    } else if (elem?.mozCancelFullScreen) {
      elem?.mozCancelFullScreen();
    } else if (elem?.webkitExitFullscreen) {
      elem?.webkitExitFullscreen();
    }
  }
}
