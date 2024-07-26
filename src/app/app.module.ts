import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InteractionThemeModule } from './interaction-theme/interaction-theme.module';
import { InteractionCoreDebugModule } from '@vivocha/client-interaction-core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InteractionCoreDebugModule,
    InteractionThemeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
