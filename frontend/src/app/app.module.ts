import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CandlesApiService } from 'src/app/shared/services/candles-api.service';
import { ICandlesApiServiceToken } from 'src/app/shared/interfaces/i-candles-api-service';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShopModule } from './shop/shop.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';
import { CounterWrapperModule } from './counter-wrapper/counter-wrapper.module';
import { LoginModule } from './login/login.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ShopModule, 
    HomeModule,  
    FooterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoginModule,
    CounterWrapperModule,
    AngularFireModule.initializeApp(environment.firebase),
    // RouterModule


  ],
  providers: [
    {provide: ICandlesApiServiceToken, useClass: CandlesApiService}, 
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }