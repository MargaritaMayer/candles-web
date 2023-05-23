import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { TuiCarouselModule, TuiIslandModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLoaderModule, tuiMaskedMoneyValueIsEmpty } from '@taiga-ui/core';
import { RouteModule } from '../route/route.module';



@NgModule({
    declarations: [
        AboutComponent,
    ],
    imports: [
        CommonModule, 
        TuiCarouselModule,
        TuiIslandModule,
        TuiMarkerIconModule,
        TuiLoaderModule,
        TuiButtonModule,
        // TuiIconButt,
        RouteModule,
       
    ],
    exports: [
        AboutComponent,
      ]
 })

export class AboutModule { }