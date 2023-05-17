import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';

import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CandlesService } from 'src/app/shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Candle } from '../shared/interfaces/candle';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shop.component.less'],
})


export class ShopComponent implements OnInit{

  private _candles: Candle[] | null = null;
  public isShowCandles = true;

  public candlesAvailable: Candle[] = [];
  public isShowAvailableCandles = false;
  public popularCandles: Candle[] = [];

  public get candles() {
    return this._candles;
  }

  constructor(
    public candlesService: CandlesService,
    public cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  async ngOnInit(): Promise<void>  {
    this._candles = await this.candlesService.candles;
    this._candles = [... this._candles];
    this.candlesAvailable = this._candles.filter(c => c.isAvailable);
    this.popularCandles = [... this._candles];
    this.changeDetectorRef.detectChanges();
    
  }

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
    this._candles?.sort((c1, c2) => c1.price-c2.price);
  }

  public highPriceCandle() {
    this._candles?.sort((c1, c2) => c2.price-c1.price);
  }

  public popularCandle(){
    this._candles = [...this.popularCandles];
  }
 
}