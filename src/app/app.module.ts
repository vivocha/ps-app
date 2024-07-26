import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InteractionThemeModule } from './interaction-theme/interaction-theme.module';
import { InteractionCoreDebugModule } from '@vivocha/client-interaction-core';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InteractionCoreDebugModule,
    InteractionThemeModule
  ],
  providers: [
    provideLottieOptions({ player: () => player }),
    provideCacheableAnimationLoader()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
