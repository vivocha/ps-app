import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild
} from '@angular/core';

@Component({
  selector: 'vvc-quick-replies',
  templateUrl: './quick-replies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickRepliesComponent implements OnInit, OnDestroy {

  @Input() message;
  @Input() showQuickRepliesAsBalloon;
  @Input() noInteractionMode;
  @Input() hideQuickRepliesBodyWhenEmpty;
  @Input() hideTextInput;
  @Output() action = new EventEmitter();
  @Output() scrollUpdate = new EventEmitter();
  @Output() read = new EventEmitter();
  @ViewChild('qrContainer', {static: true}) container: ElementRef;
  @ViewChild('qrMsg', {static: true}) qrMsg: ElementRef;
  hasReplied = false;

  scrollOffset = 0;
  transition = 'none';

  castedMessage;

  private msgElement: HTMLDivElement;
  private listElement: HTMLDivElement;

  markRead(){
    this.read.emit(this.message.id);
  }
  markReadHandler;

  constructor() {
    this.markReadHandler = this.markRead.bind(this);
  }

  ngOnInit() {
    if (this.message) {
      this.castedMessage = {...this.message, text: this.message.body, isAgent: true};
      this.scrollOffset = this.message.scrollLeft;
      this.transition = 'smooth';
    }
    this.msgElement = this.qrMsg.nativeElement;
    this.listElement = this.qrMsg.nativeElement.closest('#vvc-messages');

    const doCheckForRead = this.message && this.message.agent && !this.message.delivered && !this.message.read;
    if (doCheckForRead){
      setTimeout( () => {
        if (this.isInView()){
          this.markRead();
        } else {
          this.addScrollListener();
        }
      }, 200);
    }
  }

  isInView(): boolean {
    const partial = true;

    const contHeight = this.listElement.scrollHeight;
    const contTop = this.listElement.scrollTop;
    const contBottom = contTop + contHeight;

    const elemTop = this.msgElement.offsetTop - this.listElement.offsetTop;
    const elemBottom = elemTop + this.msgElement.scrollHeight;

    const isTotal = (elemTop >= 0 && elemBottom <= contHeight);
    const isPart = ((elemTop < 0 && elemBottom > 0) || (elemTop > 0 && elemTop <= contHeight )) && partial;

    return isTotal || isPart;

  }

  addScrollListener(){
    this.listElement.addEventListener('scroll', this.markReadHandler);
  }

  checkForRead() {
    if (this.isInView()){
      this.listElement.removeEventListener('scroll', this.markReadHandler);
      this.markRead();
    }
  }

  ngOnDestroy() {
    if (this.scrollOffset !== this.message.scrollLeft) {
      this.scrollUpdate.emit({scrollLeft: this.scrollOffset, messageId: this.message.id});
    }
  }

  btnClicked(btn) {
    this.action.emit({ action: btn, msgId: this.message.id });
  }

  hasImage() {
    let img = false;
    if (this.message && this.message.quick_replies) {
      this.message.quick_replies.forEach( m => {
        if (m.image_url) {
          img = true;
        }
      });
    }
    return img;
  }
  showCentered() {
    return (this.message && this.message.quick_replies.length === 2);
  }
  showScrollers() {
    return (this.message && this.message.quick_replies.length > 2);
  }

  scrollRight() {
    this.scrollOffset = this.scrollOffset + 200;
  }

  scrollLeft() {
    this.scrollOffset = this.scrollOffset - 200;
  }
  canShowButtons() {
    if (this.message && this.message.no_quick_replies_interaction && this.noInteractionMode === 'remove_buttons') return false;
    return !this.message.replied;
  }
}
