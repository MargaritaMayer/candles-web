import { NgModule } from '@angular/core';
import { CounterWrapperComponent } from './counter-wrapper.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CounterWrapperComponent
    ],
    imports: [
        CommonModule,   
    ],
    exports: [
        CounterWrapperComponent,
    ]
 })
 export class CounterWrapperModule { }