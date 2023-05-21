import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candle } from './shared/interfaces/candle';
import { Observable, lastValueFrom } from 'rxjs';

import { authState } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CandlesService } from './shared/services/candles.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
 
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  constructor(public candlesService: CandlesService,
    public cartService: CartService, 
    // private route: ActivatedRoute
    ){}

  // private fragment: string = '';

  ngOnInit(): void {
    this.candlesService.initialize();
    // this.cartService.initialize();
    // this.route.fragment.subscribe(fragment => { if (fragment) this.fragment = fragment; });

  }
  // ngAfterViewInit(): void {
  //   try {
  //     document.querySelector('#' + this.fragment)?.scrollIntoView();
  //   } catch (e) { }
  // }


}