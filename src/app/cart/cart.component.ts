import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CartService } from '../shared/services/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CandlesService } from '../shared/services/candles.service';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private changeDetectorRef: ChangeDetectorRef,
    public auth: AuthService,
  ) {
    this.auth.userId.subscribe((userId) => {
      if (userId === undefined) {
        return;
      }
      this.isAuth = userId!==null;
      if (userId===null) {
        this._isLoading.next(false);
      }
    })
  }
  form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]),
    address: new FormControl<string | null>(null, [Validators.required]),
  });

  public get email() { return this.form?.get('email'); }
  public get name() { return this.form?.get('name'); }
  public get address() { return this.form?.get('address'); }


  public buyCandle() {
    if (this.form.invalid) {
      this.form.controls['email'].markAsDirty();
      this.form.controls['name'].markAsDirty();
      this.form.controls['address'].markAsDirty();
      return;
    }
    this.auth.showNotification('С вами скоро свяжется курьер', 'Ваш заказ оформлен');

  }


  public candles: {
    'candles-1': Candle[];
    'candles-2': Candle[];
}| null = null;

  public cartItems: CartItem[] | null = null;
  public summary: number = 0;

  public isAuth: boolean = false;


  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public get isLoading(): Observable<boolean>{
    return this._isLoading
  }




  async ngOnInit(): Promise<void> {
    this.candles = await this.candlesService.candles;

    this.cartService.cartItems.subscribe(
      async (cartItems) => {
        if (cartItems === null) return;
        this.cartItems = cartItems
        this.summary = await this.candlesService.calculateCartSum(cartItems);
        this._isLoading.next(false);

      }
      );
      this.changeDetectorRef.detectChanges();
  }

  public deleteItem(id: string) {
    if (!this.cartItems) return;
    this.cartService.deleteItem(id);
    this.candlesService.calculateCartSum(this.cartItems);
  }

  public changeCount(cartItem: CartItem) {
    this.cartService.updateCount(cartItem.id, cartItem.count);
  }

  public getCandle(cartItem: CartItem) {
    return this.candles?.['candles-1'].find(candle => candle.id === cartItem.idCandle)
  }
 }
