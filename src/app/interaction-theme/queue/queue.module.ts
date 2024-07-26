import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueComponent } from './queue/queue.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    QueueComponent
  ],
  declarations: [QueueComponent]
})
export class QueueModule { }
