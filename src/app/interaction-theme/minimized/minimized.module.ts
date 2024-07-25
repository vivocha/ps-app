import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimizedComponent } from './minimized/minimized.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MinimizedComponent
  ],
  declarations: [MinimizedComponent]
})
export class MinimizedModule { }
