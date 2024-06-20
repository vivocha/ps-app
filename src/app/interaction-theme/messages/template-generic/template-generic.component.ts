import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy, OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'vvc-template-generic',
  templateUrl: './template-generic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateGenericComponent implements OnInit, OnDestroy {

  @Input() message;
  @Output() action = new EventEmitter();
  @Output() scrollUpdate = new EventEmitter();
  @Output() read = new EventEmitter();
  @ViewChild('carousel', {static: true}) container: ElementRef;
  @ViewChild('tplGen', {static: true}) tplGen: ElementRef;

  scrollOffset = 0;
  lastCarouselElem = 0;
  transition = 'none';
  disabled: boolean = false;

  private carouselElemWith = 260;

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
      this.scrollOffset = this.message.scrollLeft;
      this.transition = 'smooth';
      if(this.message.elements.length > 1){
        this.lastCarouselElem = ((this.message.elements.length -1) * this.carouselElemWith) - 1;
      }
    }
    this.msgElement = this.tplGen.nativeElement;
    this.listElement = this.tplGen.nativeElement.closest('#vvc-messages');

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

  btnClicked(btn): any {
    if (btn.type !== 'web_url') {
      this.disabled = true;
    }
    this.action.emit(btn);
  }

  scrollRight() {
    this.scrollOffset = this.scrollOffset + this.carouselElemWith;
  }

  scrollLeft() {
    this.scrollOffset = this.scrollOffset - this.carouselElemWith;
  }

  defaultAction(elem) {
    if (elem.default_action) {
      this.action.emit(elem.default_action);
    }
  }

  swipe(ev){
    if(ev === "swiperight"){
      if(this.message.elements.length > 1 && this.scrollOffset > 0){
        this.scrollLeft();
      }
    }
    if(ev === "swipeleft"){
      if(this.message.elements.length > 1 && this.scrollOffset <= this.lastCarouselElem){
        this.scrollRight();
      }
    }
  }
}
