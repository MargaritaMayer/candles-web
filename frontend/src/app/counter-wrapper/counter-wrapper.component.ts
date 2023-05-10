import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter-wrapper',
  templateUrl: './counter-wrapper.component.html',
  styleUrls: ['./counter-wrapper.component.less']
})
export class CounterWrapperComponent {
  @Input()
  public count = 1;

  @Output()
  public countEvent = new EventEmitter<number>();

  add(){
    this.count += 1;
    this.countEvent.emit(this.count);
  }
  
  reduce(){
    if (this.count > 1){
      this.count -= 1;
      this.countEvent.emit(this.count);
    }
  }
}
