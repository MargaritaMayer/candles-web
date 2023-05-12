import { Component, Input, OnInit } from '@angular/core';
import { Candle } from '../shared/interfaces/candle';
import { ActivatedRoute } from '@angular/router';
import { CandlesService } from '../shared/services/candles.service';

@Component({
  selector: 'app-candle',
  templateUrl: './candle.component.html',
  styleUrls: ['./candle.component.less']
})
export class CandleComponent implements OnInit {
  
  // @Input()
  public candle : Candle | null = null;
  public idCandle : number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    // public candlesService: CandlesService,
    ) { }

  ngOnInit(): void {
    this.idCandle = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // this.candle = this.candlesService.getCandleById(3) || null;
    // this.candlesService.initialize()
   
  }

  public showAddImg(id: number) {

  }
 

}
