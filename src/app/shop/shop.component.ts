import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, timeInterval } from 'rxjs';

import { CartItem } from 'src/app/shared/interfaces/cart-item';
import { CandlesService } from 'src/app/shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Candle } from '../shared/interfaces/candle';

import { ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TUI_ARROW } from '@taiga-ui/kit';

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
  public popularCandles: Candle[] = [];
  public popularAvailableCandles: Candle[] = [];
  public get candles() {
    return this._candles;
  }

  constructor(
    public candlesService: CandlesService,
    public cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  async ngOnInit(): Promise<void>  {
    this.testValue.valueChanges.subscribe((selectValue) => { 
      if (!selectValue) return;
      this.clickSelect(selectValue)
    });
    this._candles = await this.candlesService.candles;
    this._candles = [... this._candles];
    this.candlesAvailable = this._candles.filter(c => c.isAvailable);
    this.popularCandles = [... this._candles];
    this.popularAvailableCandles = [... this.candlesAvailable]
    this.changeDetectorRef.detectChanges();   
  
  }
  form = new FormGroup({
      isShowAvailableCandles: new FormControl<boolean>(false),
  });

  private _isShowAvailableCandles: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
  public get isShowAvailable(): Observable<boolean>{
    return this._isShowAvailableCandles;
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
    this.form.value.isShowAvailableCandles = ! this.form.value.isShowAvailableCandles;
    this._isShowAvailableCandles.next(this.form.value.isShowAvailableCandles);


  }

  public lowPriceCandle() {
    this._candles?.sort((c1, c2) => c1.price-c2.price);
    this.candlesAvailable.sort((c1, c2) => c1.price-c2.price);
  }

  public highPriceCandle() {
    this._candles?.sort((c1, c2) => c2.price-c1.price);
    this.candlesAvailable.sort((c1, c2) => c2.price-c1.price);

  }

  public popularCandle(){
    this._candles = [...this.popularCandles];
    this.candlesAvailable = [...this.popularAvailableCandles];
    
  }
  clickSelect(selectValue: string){
    if (selectValue==='По популярности'){
      this.popularCandle()
    }
    if (selectValue==='По возрастанию цены'){
      this.lowPriceCandle()
    }
    if (selectValue==='По убыванию цены'){
      this.highPriceCandle()
    }
  }
  


  public items = [
    'По популярности',
    'По возрастанию цены',
    'По убыванию цены',
  ];

  testValue = new FormControl("По популярности");
 
}