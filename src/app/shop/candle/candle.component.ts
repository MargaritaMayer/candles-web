import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  public _candle : Candle | null = null;
  public count = 1;
  public color = 2;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public candlesService: CandlesService,
    public cartService: CartService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef

    ) { }

  public get candle() {
    return this._candle;
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

  }

  public ShowCollapse(id: string) {
   
  }

  public showAddImg(id: number) {
  }

  public AddCartItem() {
    if (!this._candle) return;
    const selectWick = <HTMLSelectElement>document.getElementById('wick');
    const wick = selectWick.options[selectWick.selectedIndex].text;

    const selectScent = <HTMLSelectElement>document.getElementById('scent');
    const scent = selectScent.options[selectScent.selectedIndex].text;

    const selectPackaging = <HTMLSelectElement>document.getElementById('packaging');
    const packaging = selectPackaging.options[selectPackaging.selectedIndex].text;

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
}
