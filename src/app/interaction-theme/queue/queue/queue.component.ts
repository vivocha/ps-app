import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'vvc-queue',
  templateUrl: './queue.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueComponent {

  @Input() context;

  options: AnimationOptions = {
    renderer: 'svg',
    loop: true,
    path: 'assets/static/loading.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    animationItem.play();
  }
}
