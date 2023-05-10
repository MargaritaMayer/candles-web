import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-Item';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.less']
})
export class ShopItemComponent {
  public count = 1;

  @Input()
  public candle : Candle | null = null;

  @Output()
  public clickAddCartItem = new EventEmitter<CartItem>();  

  public hideCandles(): void {    
    if (this.candle) {
      this.clickAddCartItem.emit({candleId: this.candle.id, count: this.count});
      this.count = 1;
    }
  } 
  
  public changeCount(count: number) {
      this.count = count;
  }
}
