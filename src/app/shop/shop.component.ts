import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';

import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CandlesService } from 'src/app/shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Candle } from '../shared/interfaces/candle';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shop.component.less'],
})


export class ShopComponent {

  public candles: Candle[] = [];
  public candlesAvailable: Candle[] = [];
  public isShowCandles = true;
  public isShowAvailableCandles = false;
  public popularCandles: Candle[] = [];

  public get isLoading() {
    this.candles = this.candlesService.candles;
    this.candlesAvailable = this.candles.filter(c => c.isAvailable);
    this.popularCandles = this.candlesService.candles;
    return this.candlesService.isLoading.asObservable();
  }

  constructor(
    public candlesService: CandlesService,
    public cartService: CartService,
  ) {}



  public showCandles(): void {
    this.isShowCandles = true;
  }

  public hideCandles(): void {
    this.isShowCandles = false;
  }

  addCartItem(item: CartItem): void {
    this.cartService.addCartItem(item);
    this.hideCandles();
  }

  public deleteCartItem(id: string): void {
    this.cartService.deleteItem(id);
  } 
  
  public updateCartItem(cartItem: CartItem){
    this.cartService.updateCount(cartItem.id, cartItem.count);
  } 
  public showAvailableCandles(){
    this.isShowAvailableCandles = !this.isShowAvailableCandles;
  }

  public lowPriceCandle() {
    this.candles = this.candles.sort((c1, c2) => c1.price-c2.price);
  }

  public highPriceCandle() {
    this.candles = this.candles.sort((c1, c2) => c2.price-c1.price);
  }

  public popularCandle(){
    console.log(this.popularCandles)
    this.candles = this.popularCandles;
  }
 
}