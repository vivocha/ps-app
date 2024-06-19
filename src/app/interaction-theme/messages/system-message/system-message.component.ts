import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vvc-system-message',
  templateUrl: './system-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemMessageComponent {

  @Input() message;

}
