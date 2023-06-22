import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route.component';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [
        RouteComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        TuiBreadcrumbsModule,

    ],
    exports: [
        RouteComponent,
      ]
 })

export class RouteModule { }
