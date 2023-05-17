import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CartService } from '../shared/services/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CandlesService } from '../shared/services/candles.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  constructor(    
    public cartService: CartService, 
    public candlesService: CandlesService,
    private store: AngularFirestore, ) {}

  public get isLoading() {
    return this.cartService.isLoading.asObservable() //&& this.candlesService.isLoading.asObservable();
  }

  // public get isLoading1() {
  //   return this.candlesService.isLoading.asObservable();
  // }

  ngOnInit(): void {
    // this.candlesService.initialize();

    this.cartService.initialize();
    this.candles = this.candlesService.candles;
  }
  

  public candles: Candle[] | null = [];

  
  

  public deleteItem(id: string) {
    this.cartService.deleteItem(id);
  }  
  
  public changeCount(cartItem: CartItem) {  
    this.cartService.updateCount(cartItem.id, cartItem.count);
  }

  public getCandle(cartItem: CartItem) {
    return this.candles?.find(candle => candle.id === cartItem.idCandle)
  }
 }
