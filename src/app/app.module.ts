import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FacebookSigninComponent } from './signin/facebook-signin/facebook-signin.component';

import { AppRoutingModule } from './app-routing.module';
import { FacebookSigninService } from './signin/facebook-signin/facebook-signin.service';

@NgModule({
  declarations: [
    AppComponent,
    FacebookSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FacebookSigninService],
  bootstrap: [AppComponent]
})
export class AppModule { }
