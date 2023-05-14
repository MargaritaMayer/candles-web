import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';

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
  public deleteEvent = new EventEmitter<string>();

  @Output()
  public countEvent = new EventEmitter<CartItem>();

  delete(): void {
    if (this.cartItem){
      this.deleteEvent.emit(this.cartItem.idCandle);
    }
  }  

  changeCount(count: number){
    if (this.cartItem){
      this.countEvent.emit(
        {"id": this.cartItem.id, 
          "idCandle": this.cartItem.idCandle, 
          "count": count, 
          "wick": this.cartItem.wick,
          "scent": this.cartItem.scent,
          "packaging": this.cartItem.packaging,
        });
    }
  }
}
