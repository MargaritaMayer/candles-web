import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Candle } from '../../shared/interfaces/candle';
import { CartItem } from '../../shared/interfaces/cart-item';

import { ActivatedRoute, Router } from '@angular/router';
import { CandlesService } from '../../shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FavoriteItem } from 'src/app/shared/interfaces/favorite-item';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-candle',
  templateUrl: './candle.component.html',
  styleUrls: ['./candle.component.less']
})
export class CandleComponent implements OnInit {

  public _candle : Candle | null = null;
  public count = 1;
  public userId: string | null | undefined = "";  
  public idMainImg = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    public candlesService: CandlesService,
    public cartService: CartService,
    public favoriteService: FavoriteService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private auth: AuthService,

    ) { }

  public clickImg(id: number){
    this.idMainImg = id;
  }
  public get candle() {
    return this._candle;
  }

  public addFavorite(){

    if (this.userId === null) {
      this.auth.showNotification("Чтобы добавить товар в избранное, пожалуйста, авторизируйтесь", "Вам необходимо авторизироваться");
      this.router.navigate(['/login'])
      return;
    } 
    if (!this._candle || !this.formWick.value || 
      !this.formScent.value  || !this.formPackaging.value) return;

    const wick = this.formWick.value;
    const scent = this.formScent.value;
    const packaging = this.formPackaging.value;

    const favoriteItem: FavoriteItem = {
      'id': '', 
      'idCandle': this._candle.id || '', 
      'wick': wick,
      'scent': scent,
      'packaging': packaging,
    }
    
    this.favoriteService.addFavoriteItem(favoriteItem);


  }

  async ngOnInit(): Promise<void> {
    
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (id){
      const candles = await this.candlesService.candles;
      this._candle = candles.find(c => c.id === id) || null;
      if (this._candle===null){
        this.router.navigate(['/error']);
      }      
    } 
    this.changeDetectorRef.detectChanges();
    this.auth.userId.subscribe(
    (userId) => {
      this.userId = userId;
    })

    

  }
  public showAddImg(id: number) {
  }

  public AddCartItem() {
    if (this.userId === null) {
      this.auth.showNotification("Чтобы добавить товар в корзину, пожалуйста, авторизируйтесь", "Вам необходимо авторизироваться");
      this.router.navigate(['/login'])
      return;
    } 
    if (!this._candle || !this.formWick.value || 
      !this.formScent.value  || !this.formPackaging.value) {
        return;
      }
    this.auth.showNotification("", "Товар добавлен в корзину");
    const wick = this.formWick.value;
    const scent = this.formScent.value;
    const packaging = this.formPackaging.value;

    const cartItem: CartItem = {
      'id': '', 
      'idCandle': this._candle.id || '', 
      'count': this.count,
      'wick': wick,
      'scent': scent,
      'packaging': packaging,
    }
    
    this.cartService.addCartItem(cartItem);

  }
 
  changeCount(count: number){
    this.count = count;
  }

  public itemsWick = [
    'Хлопковый',
    'Деревянный',   
  ];
  formWick = new FormControl("Хлопковый");

  public itemsScent = [
    'Лавандовое поле',
    'Груша в карамели', 
    'Домашнее какао',
    'Зеленый чай',  
  ];
  formScent = new FormControl("Лавандовое поле");
 
  public itemsPackaging = [
    'Стандартная',
    'Подарочная',   
  ];
  formPackaging = new FormControl("Стандартная");
}
