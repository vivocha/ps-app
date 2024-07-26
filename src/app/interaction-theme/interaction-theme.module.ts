import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ChatModule,
  ChatPanelsModule,
  ClosePanelModule,
  QueueModule,
  LoadingPanelModule,
  DataCollectionModule,
  MultimediaModule,
  CbnModule,
  InboundModule
} from '@vivocha/client-interaction-layout';

import { TopBarModule } from './top-bar/top-bar.module';
import { MessagesModule } from './messages/messages.module';
import { MinimizedModule } from './minimized/minimized.module';

const layoutModules = [
  TopBarModule,
  DataCollectionModule,
  QueueModule,
  ChatModule,
  ChatPanelsModule,
  MessagesModule,
  MultimediaModule,
  ClosePanelModule,
  LoadingPanelModule,
  MinimizedModule,
  CbnModule,
  InboundModule
];

@NgModule({
  imports: [
    CommonModule,
    ...layoutModules
  ],
  exports: [
    ...layoutModules
  ],
  declarations: [

  ]
})
export class InteractionThemeModule { }
