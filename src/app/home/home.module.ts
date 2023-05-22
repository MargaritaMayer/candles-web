import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,   
        CounterWrapperModule,
        RouterModule,
        TuiButtonModule,
    ],
    exports: [
        HomeComponent,
      ]
 })

export class HomeModule { }