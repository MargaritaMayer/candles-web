import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Candle } from 'src/app/shared/interfaces/candle';
import { CartItem } from 'src/app/shared/interfaces/cart-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

}
