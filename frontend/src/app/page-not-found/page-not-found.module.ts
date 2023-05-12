import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
// import { RouterModule } from '@angular/router';
import { RouteModule } from '../route/route.module';

@NgModule({
    declarations: [
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,   
        // RouterModule,
        RouteModule      
    ],
    exports: [
        PageNotFoundComponent,
      ]
 })

export class PageNotFoundModule { }