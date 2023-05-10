import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/shared/interfaces/cart-Item';
import { CandlesService } from 'src/app/shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less'],
})


export class ShopComponent implements OnInit {

  public isShowCandles = true;

  constructor(
    public candlesService: CandlesService,
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.candlesService.initialize();
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

  public deleteCartItem(id: number): void {
    this.cartService.deleteItem(id);
  } 
  
  public updateCartItem(cartItem: CartItem){
    this.cartService.updateCount(cartItem);
  } 
 
}