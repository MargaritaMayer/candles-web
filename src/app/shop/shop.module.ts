import { NgModule } from '@angular/core';

import { ShopItemModule } from './shop-item/shop-item.module';
import { ShopComponent } from './shop.component';
import { CommonModule } from '@angular/common';
import { CartModule } from '../cart/cart.module';
import { RouteModule } from '../route/route.module';
import { TuiDataListWrapperModule, TuiSelectModule, TuiToggleModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        CommonModule,
        CartModule,
        ShopItemModule,
        RouteModule,
        TuiToggleModule,
        FormsModule,
        ReactiveFormsModule,
        TuiHostedDropdownModule,
        TuiButtonModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        
  
    ],
    exports: [
        ShopComponent,
    ]
})
export class ShopModule { }