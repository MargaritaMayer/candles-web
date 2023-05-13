import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';

import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CandlesService } from 'src/app/shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./shop.component.less'],
})


export class ShopComponent {

  public isShowCandles = true;
  
  public get isLoading() {
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
 
}