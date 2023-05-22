import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  NgbDropdownModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule, NgbDropdownModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit, OnDestroy {
  // TODO: Show Help popover
  // TODO: Show setting popover

  @Input() public cardTitle!: string;
  @Input() public enableFullscreen: boolean = true;
  @Input() public enableSetting: boolean = true;

  @ViewChild('contentWrapper') contentWrapper!: ElementRef;
  private fullscreenEnabled: boolean = false;
  private abort = new AbortController();

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    window.addEventListener('fullscreenchange', this.fullScreenChangeHandel, {
      signal: this.abort.signal,
    });
  }

  public toggleFullscreen(elem: any) {
    if (this.fullscreenEnabled) {
      this.closeFullscreen();
    } else {
      this.openFullscreen(elem);
    }
  }

  private fullScreenChangeHandel = (event: any) => {
    if (!this.fullscreenEnabled) {
      this.toggleElementHeight('800px');
    } else {
      this.toggleElementHeight('300px');
    }
    this.fullscreenEnabled = !this.fullscreenEnabled;
  };

  private openFullscreen(elem: any) {
    // this.fullscreenEnabled = true;
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
    // this.fullscreenEnabled = false;
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
  ngOnDestroy(): void {
    this.abort.abort();
  }
}
