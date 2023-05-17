import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { RouteModule } from '../route/route.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule, 
        RouteModule,
        RouterModule,
        CartItemModule,
        ButtonModule,  
    ],
    exports: [
        CartComponent,
    ]
 })
 export class CartModule { }