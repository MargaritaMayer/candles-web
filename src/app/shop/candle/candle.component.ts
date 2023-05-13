import { Component, Input, OnInit } from '@angular/core';
import { Candle } from '../../shared/interfaces/candle';
import { CartItem } from '../../shared/interfaces/cart-item';

import { ActivatedRoute, Router } from '@angular/router';
import { CandlesService } from '../../shared/services/candles.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-candle',
  templateUrl: './candle.component.html',
  styleUrls: ['./candle.component.less']
})
export class CandleComponent implements OnInit {
  
  public candle : Candle | null = null;
  public id : string | null = null;
  public count = 1;
  public color = 2;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public candlesService: CandlesService,
    public cartService: CartService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id){
      if (this.candlesService.getCandleById(this.id)) {
        this.candle = this.candlesService.getCandleById(this.id)!;
      }
      else {
        this.router.navigate(['shop/' + this.candle?.id]); 

      }
    }   
  }

  public showAddImg(id: number) {
  }

  public AddCartItem() {
    const cartItem: CartItem = {
      'id': '', 
      'idCandle': this.id || '', 
      'count': this.count,
      'color': this.color
    }
    this.cartService.addCartItem(cartItem);

  }
 

}
