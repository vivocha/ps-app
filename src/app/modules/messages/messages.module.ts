import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { SystemMessageComponent } from './system-message/system-message.component';
import { TemplateGenericComponent } from './template-generic/template-generic.component';
import { QuickRepliesComponent } from './quick-replies/quick-replies.component';
import { TranslateModule } from '@ngx-translate/core';
import { RequestMessageComponent } from './request-message/request-message.component';

const components = [
  ChatMessageComponent,
  SystemMessageComponent,
  TemplateGenericComponent,
  QuickRepliesComponent,
  RequestMessageComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [...components],
  declarations: [...components]
})
export class MessagesModule { }
