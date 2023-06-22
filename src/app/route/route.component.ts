import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./route.component.less']
})
export class RouteComponent{

  public items: {caption: string, routerLink?: string}[] = []

  @Input()
  set name(name: string) {
    this.items = [
      {
          caption: 'Home',
          routerLink: '/home',
      },
      {
          caption: name,
      },
    ];
    if (this.isCandle) {
      this.items.splice(
        1, 0, {
          caption: 'Свечи',
          routerLink: '/shop',
        },);
    }

  }

  @Input()
  public isCandle = false;
}
