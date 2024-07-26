import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'vvc-queue',
  templateUrl: './queue.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent {

  @Input() context;

}
