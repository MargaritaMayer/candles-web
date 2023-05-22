import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { RouteModule } from '../route/route.module';
import { TuiAccordionModule } from '@taiga-ui/kit';


@NgModule({
    declarations: [
        FaqComponent,
    ],
    imports: [
        CommonModule, 
        RouteModule, 
        TuiAccordionModule, 
    ],
    exports: [
        FaqComponent,
      ]
 })

export class FaqModule { }