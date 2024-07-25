import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, OnInit, ViewChild, ElementRef} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'vvc-chat-message',
  templateUrl: './chat-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {

  @Input() message;
  @Input() agent;
  @Output() showDoc = new EventEmitter();
  @Output() read = new EventEmitter();
  @Output() resend = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    if (event.target.href){
      this.openDocument(event.target.href);
    }
  }

  @ViewChild('chatMsg', {static: true}) chatMsg: ElementRef;

  private msgElement: HTMLDivElement;
  private listElement: HTMLDivElement;

  previewTipe;

  markRead(){
    this.read.emit(this.message.id);
  }
  markReadHandler;

  constructor(private sanitizer: DomSanitizer){
    this.markReadHandler = this.markRead.bind(this);
  }

  ngOnInit(): void {
    if(this.message.meta && this.message.meta.mimetype){
      this.previewTipe = 'preview_' + this.message.meta.mimetype.split("/")[0];
    }

    this.msgElement = this.chatMsg.nativeElement;
    this.listElement = this.chatMsg.nativeElement.closest('#vvc-messages');

    const doCheckForRead = this.message && (this.message.type === 'chat') && this.message.isAgent && !this.message.delivered && !this.message.read;
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

  openDocument(url){
    this.showDoc.emit(url);
  }

  sendFailed(){
    this.resend.emit(this.message);
  }

  sanitizeThis(url){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
