import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./route.component.less']
})
export class RouteComponent {
  @Input()
  public name: string = "";

  @Input()
  public isCandle: boolean = false;
  

}
