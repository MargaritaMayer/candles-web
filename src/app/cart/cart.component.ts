import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  constructor(    public cartService: CartService,
    private auth: AuthService,
    private store: AngularFirestore, ) {}

  public get isLoading() {
    return this.cartService.isLoading.asObservable();
  }
  ngOnInit(): void {
    this.cartService.initialize();
    console.log(this.cartService.cartItems)
  }
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
