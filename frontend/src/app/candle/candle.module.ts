import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';
import { CandleComponent } from './candle.component';
import { RouteModule } from '../route/route.module';
import { LoginModule } from '../login/login.module';

@NgModule({
    declarations: [
        CandleComponent
    ],
    imports: [
        CommonModule,   
        RouteModule,
        LoginModule
    ],
    exports: [
        CandleComponent,
      ]
 })

export class CandleModule { }