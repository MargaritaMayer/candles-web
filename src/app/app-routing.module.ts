import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { CandleComponent } from './shop/candle/candle.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FaqComponent } from './faq/faq.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'shop/:id', component: CandleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'candle', component: CandleComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'faq', component: FaqComponent},

  {path: '**', component: PageNotFoundComponent},
]

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(appRoute, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
