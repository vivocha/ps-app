import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vvc-template-system',
  templateUrl: './template-system.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateSystemComponent {

  @Input() message;

}
