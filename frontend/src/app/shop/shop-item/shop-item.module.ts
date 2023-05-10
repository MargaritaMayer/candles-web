import { NgModule } from '@angular/core';
import { ShopItemComponent } from './shop-item.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../button/button.module';
import { CounterWrapperModule } from '../../counter-wrapper/counter-wrapper.module';

@NgModule({
    declarations: [
        ShopItemComponent
    ],
    imports: [
        CommonModule,   
        ButtonModule,
        CounterWrapperModule,
    ],
    exports: [
        ShopItemComponent,
      ]
 })

export class ShopItemModule { }