import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vvc-request-message',
  templateUrl: './request-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestMessageComponent {

  @Input() message;
  @Output() accept = new EventEmitter();
  @Output() reject = new EventEmitter();

}