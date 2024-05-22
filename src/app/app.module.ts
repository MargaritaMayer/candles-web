import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule} from '@taiga-ui/core';
import { HeaderModule } from './header/header.module';
import { LoginModule } from './login/login.module';
import { FooterModule } from './footer/footer.module';
import { AppRoutingModule } from './app-routing.module';
import { BoldDirective } from './CustomDirective/bold.directive';
import { MainPageModule } from './home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BoldDirective,
  ],
  imports: [
    BrowserModule,
    TuiRootModule,
    HeaderModule,
    LoginModule,
    FooterModule,
    AppRoutingModule,
    MainPageModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }