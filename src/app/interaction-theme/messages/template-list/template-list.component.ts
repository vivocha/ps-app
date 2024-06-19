import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'vvc-template-list',
  templateUrl: './template-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  @Input() message;
  @Output() action = new EventEmitter();
  @Output() read = new EventEmitter();

  @ViewChild('tplList', {static: true}) tplList: ElementRef;

  disabled: boolean = false;

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
    this.msgElement = this.tplList.nativeElement;
    this.listElement = this.tplList.nativeElement.closest('#vvc-messages');

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

  defaultAction(elem){
    if (elem.default_action) this.action.emit(elem.default_action);
  }

  btnClicked(btn): any {
    this.disabled = true;
    this.action.emit(btn);
  }
}
