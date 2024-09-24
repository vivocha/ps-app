import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vvc-top-bar',
  templateUrl: './top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {

  @Input() context;
  @Input() agent;
  @Input() hideTopControls;
  @Output() onMinimize = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onSurvey = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onHideChat = new EventEmitter();
  @Output() onVoiceUpgrade = new EventEmitter();
  @Output() onVideoUpgrade = new EventEmitter();
  @Output() onMaximize = new EventEmitter();

  isMenuVisible = false;
  closeAttempts = 0;

  constructor() {}

  closeContact() {
    this.onClose.emit();
  }
  closeMenu() {
    this.isMenuVisible = false;
  }
  hasMenu() {
    let itemNumber = 0;
    if (this.context && !this.context.isMediaConnecting && !this.context.cbnMode) {
      if (this.context.canMinimize) {
        itemNumber++;
      }
      if (this.context.canStartAudio && !this.context.isMediaConnected) {
        itemNumber++;
      }
      if (this.context.canStartVideo && !this.context.isMediaConnected) {
        itemNumber++;
      }
      if ((this.context.isMediaMinimized && this.context.isMediaConnected) && !this.context.isAutoChat) {
        itemNumber++;
      }
    }
    return (itemNumber > 1);
  }
  removeApp() {
    this.closeContact();
  }
  showMenu() {
    this.isMenuVisible = true;
  }
}
