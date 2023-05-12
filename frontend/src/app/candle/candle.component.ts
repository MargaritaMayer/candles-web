import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Candle } from '../shared/interfaces/candle';
import { ActivatedRoute } from '@angular/router';
import { CandlesService } from '../shared/services/candles.service';

@Component({
  selector: 'app-candle',
  templateUrl: './candle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./candle.component.less']
})
export class CandleComponent implements OnInit {
  
  // @Input()
  // public candle : Candle | null = null;
  public candleId : number | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public candlesService: CandlesService,) { }

  ngOnInit(): void {
    this.candleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.candlesService.initialize()

   
  }

  public showAddImg(id: number) {

  }
 

}
