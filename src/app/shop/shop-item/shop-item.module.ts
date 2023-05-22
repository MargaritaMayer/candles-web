import { NgModule } from '@angular/core';
import { ShopItemComponent } from './shop-item.component';
import { CommonModule } from '@angular/common';
import { CounterWrapperModule } from '../../counter-wrapper/counter-wrapper.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ShopItemComponent
    ],
    imports: [
        CommonModule,   
        
        CounterWrapperModule,
        RouterModule
    ],
    exports: [
        ShopItemComponent,
      ]
 })

export class ShopItemModule { }