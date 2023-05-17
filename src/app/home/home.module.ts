import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,   
        ButtonModule,
        CounterWrapperModule,
        RouterModule,
    ],
    exports: [
        HomeComponent,
      ]
 })

export class HomeModule { }