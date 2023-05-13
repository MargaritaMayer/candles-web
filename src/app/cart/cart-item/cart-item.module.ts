import { NgModule } from '@angular/core';
import { CartItemComponent } from './cart-item.component';
import { CommonModule } from '@angular/common';
import { CounterWrapperModule } from 'src/app/counter-wrapper/counter-wrapper.module';

@NgModule({
    declarations: [
        CartItemComponent
    ],
    imports: [
        CommonModule, 
        CounterWrapperModule,  
    ],
    exports: [
        CartItemComponent,
    ]
 })
export class CartItemModule { }