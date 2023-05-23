import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
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
import { FaqModule } from './faq/faq.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { CandleModule } from './shop/candle/candle.module';
import { ContactsModule } from './contacts/contacts.module';
import { TuiAlertModule, TuiButtonModule, TuiLoaderModule, TuiRootModule } from '@taiga-ui/core';
import { TuiCarouselModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AboutComponent } from './about/about.component';
import { AboutModule } from './about/about.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesModule } from './favorites/favorites.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiButtonModule,
    // TuiInputModule,
    FormsModule,
    ShopModule, 
    HomeModule,  
    FooterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // LoginModule,
    CounterWrapperModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
    FaqModule,
    PageNotFoundModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => getApp()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    // CandleModule,
    // NgbModule,
    ContactsModule,
    TuiLetModule,
    TuiAlertModule,
    AboutModule,
    FavoritesModule,
    TuiCarouselModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiLoaderModule,
    TuiButtonModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }