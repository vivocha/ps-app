import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'vvc-minimized',
  templateUrl: './minimized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimizedComponent {

  @Input() context;
  @Input() agent;
  @Output() expand = new EventEmitter();

}
