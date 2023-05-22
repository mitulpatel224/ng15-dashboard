import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

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

  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  private fullscreenEnabled: boolean = false;

  constructor(private renderer2: Renderer2) {}

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
      this.toggleElementHeight('700px');
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem?.webkitRequestFullscreen();
      this.toggleElementHeight('700px');
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem?.msRequestFullscreen();
      this.toggleElementHeight('700px');
    }
  }

  private closeFullscreen() {
    this.fullscreenEnabled = false;
    const elem = document as any;
    if (elem?.exitFullscreen) {
      elem?.exitFullscreen();
      this.toggleElementHeight('300px');
    } else if (elem?.mozCancelFullScreen) {
      elem?.mozCancelFullScreen();
      this.toggleElementHeight('300px');
    } else if (elem?.webkitExitFullscreen) {
      elem?.webkitExitFullscreen();
      this.toggleElementHeight('300px');
    }
  }

  private toggleElementHeight(height: string) {
    this.renderer2.setStyle(
      this.contentWrapper.nativeElement,
      'height',
      height
    );
  }
}
