import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-Item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart-item.component.less']
})
export class CartItemComponent {
  @Input()
  public cartItem : CartItem | null = null;

  @Input()
  public candle : Candle | undefined = undefined;

  @Output()
  public deleteEvent = new EventEmitter<number>();

  @Output()
  public countEvent = new EventEmitter<CartItem>();

  delete(): void {
    if (this.cartItem){
      this.deleteEvent.emit(this.cartItem.candleId);
    }
  }  

  changeCount(count: number){
    if (this.cartItem){
      this.countEvent.emit({candleId: this.cartItem.candleId, count: count});
    }
  }
}
