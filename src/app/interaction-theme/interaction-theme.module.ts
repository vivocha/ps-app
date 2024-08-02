import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ChatPanelsModule,
  ClosePanelModule,
  LoadingPanelModule,
  DataCollectionModule,
  MultimediaModule,
  CbnModule,
  InboundModule
} from '@vivocha/client-interaction-layout';

import { TopBarModule } from './top-bar/top-bar.module';
import {   ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { MinimizedModule } from './minimized/minimized.module';
import { QueueModule } from './queue/queue.module';

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
