import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CandlesApiService } from 'src/app/shared/services/candles-api.service';
import { ICandlesApiServiceToken } from 'src/app/shared/interfaces/i-candles-api-service';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TuiDataListModule, TuiRootModule} from '@taiga-ui/core';
import { ShopModule } from './shop/shop.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ErrorModule } from './error/error.module';
import { CounterWrapperModule } from './counter-wrapper/counter-wrapper.module';
import { LoginModule } from './login/login.module';

const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule, 
    FormsModule,
    TuiDataListModule,
    ShopModule, 
    HomeModule,  
    FooterModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    LoginModule,
    CounterWrapperModule,

  ],
  providers: [
    {provide: ICandlesApiServiceToken, useClass: CandlesApiService}, 
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }