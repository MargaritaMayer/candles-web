import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { CartItemModule } from './cart-item/cart-item.module';
import { RouteModule } from '../route/route.module';
import { RouterModule } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule, 
        RouteModule,
        RouterModule,
        CartItemModule,
        TuiInputModule,
        FormsModule,
        ReactiveFormsModule,
        TuiButtonModule,
    ],
    exports: [
        CartComponent,
    ]
 })
 export class CartModule { }