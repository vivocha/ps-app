import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueComponent } from './queue/queue.component';
import {TranslateModule} from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    QueueComponent
  ],
  declarations: [QueueComponent]
})
export class QueueModule { }
