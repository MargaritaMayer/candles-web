import { NgModule } from '@angular/core';
import { CounterWrapperComponent } from './counter-wrapper.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputNumberModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [
        CounterWrapperComponent
    ],
    imports: [
        CommonModule,   
        FormsModule, 
        ReactiveFormsModule, 
        TuiInputNumberModule,
        
    ],
    exports: [
        CounterWrapperComponent,
    ]
 })
 export class CounterWrapperModule { }