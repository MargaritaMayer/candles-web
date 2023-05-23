import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterWrapperModule } from '../../counter-wrapper/counter-wrapper.module';
import { CandleComponent } from './candle.component';
import { RouteModule } from '../../route/route.module';
import { LoginModule } from '../../login/login.module';
import { ShopItemModule } from '../shop-item/shop-item.module';
import { TuiAccordionModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CandleComponent
    ],
    imports: [
        CommonModule,   
        RouteModule,
        LoginModule,
        ShopItemModule,
        CounterWrapperModule,
        TuiAccordionModule,
        TuiButtonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiHostedDropdownModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        

    ],
    exports: [
        CandleComponent,
      ]
 })

export class CandleModule { }