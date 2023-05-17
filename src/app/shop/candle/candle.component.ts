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

  private collapses = new Map<string, boolean>(); 
  
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

  public ShowCollapse(id: string) {
   
  }

  public showAddImg(id: number) {
  }

  public AddCartItem() {
    const selectWick = <HTMLSelectElement>document.getElementById('wick');
    const wick = selectWick.options[selectWick.selectedIndex].text;

    const selectScent = <HTMLSelectElement>document.getElementById('scent');
    const scent = selectScent.options[selectScent.selectedIndex].text;

    const selectPackaging = <HTMLSelectElement>document.getElementById('packaging');
    const packaging = selectPackaging.options[selectPackaging.selectedIndex].text;

    const cartItem: CartItem = {
      'id': '', 
      'idCandle': this.id || '', 
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
}
