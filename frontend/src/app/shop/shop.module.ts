import { NgModule } from '@angular/core';

import { ShopItemModule } from './shop-item/shop-item.module';
import { ShopComponent } from './shop.component';
import { CommonModule } from '@angular/common';
import { CartModule } from '../cart/cart.module';

@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        CommonModule,
        CartModule,
        ShopItemModule
  
    ],
    exports: [
        ShopComponent,
    ]
})
export class ShopModule { }