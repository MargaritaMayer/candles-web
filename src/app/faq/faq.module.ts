import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { RouteModule } from '../route/route.module';


@NgModule({
    declarations: [
        FaqComponent,
    ],
    imports: [
        CommonModule, 
        RouteModule,  
    ],
    exports: [
        FaqComponent,
      ]
 })

export class FaqModule { }