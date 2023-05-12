import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  @Input()
  public cartItems: CartItem[] | null = [];

  @Input()
  public candles: Candle[] | null = [];

  @Input()
  public sum = 0;
  
  @Output()
  public deleteEvent = new EventEmitter<string>();

  @Output()
  public countEvent = new EventEmitter<CartItem>();

  public deleteItem(id: string) {
    this.deleteEvent.emit(id);
  }  
  
  public changeCount(cartItem: CartItem) {  
    this.countEvent.emit(cartItem);
  }

  public getCandle(cartItem: CartItem) {
    return this.candles?.find(candle => candle.id === cartItem.idCandle)
  }
 }
