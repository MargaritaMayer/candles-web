import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouteModule } from '../route/route.module';

@NgModule({
    declarations: [
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,   
        RouteModule      
    ],
    exports: [
        PageNotFoundComponent,
      ]
 })

export class PageNotFoundModule { }