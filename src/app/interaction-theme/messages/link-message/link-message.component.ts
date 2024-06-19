import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vvc-link-message',
  templateUrl: './link-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkMessageComponent {

  @Input() message;
  @Output() linkClicked = new EventEmitter();

  constructor() { }


}
