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
import { AboutComponent } from './about/about.component';
import { FavoritesComponent } from './favorites/favorites.component';


const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', title: 'THE CANDLES', component: HomeComponent},
  {path: 'cart', title: 'Корзина', component: CartComponent},
  {path: 'shop', title: 'Магазин', component: ShopComponent},
  {path: 'shop/:id', component: CandleComponent},
  {path: 'login', title: 'Вход', component: LoginComponent},
  {path: 'candle', title: 'Свеча', component: CandleComponent},
  {path: 'contacts', title: 'Контакты', component: ContactsComponent},
  {path: 'faq', title: 'Вопросы и ответы', component: FaqComponent},
  {path: 'about', title: 'О магазине', component: AboutComponent},
  {path: 'favorites', title: 'Избранное', component: FavoritesComponent},

  

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
