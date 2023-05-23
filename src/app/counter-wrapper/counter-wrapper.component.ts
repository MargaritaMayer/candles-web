import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';

@Component({
  selector: 'app-counter-wrapper',
  templateUrl: './counter-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      tuiInputNumberOptionsProvider({
          decimal: 'never',
          step: 1,
      }),
  ],
  styleUrls: ['./counter-wrapper.component.less']
})
export class CounterWrapperComponent implements OnInit {

  ngOnInit(): void {
      this.value.setValue(this.count);
      this.value.valueChanges.subscribe((v) => 
      {
        if (v===null) return
        if (v <= 0) this.value.setValue(1);
        this.countEvent.emit(v);

      });
    }

    @Input()
    public count = 1;

    @Output()
    public countEvent = new EventEmitter<number>();

    value = new FormControl(this.count);

  
}
