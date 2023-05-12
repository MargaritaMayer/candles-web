import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route.component';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        RouteComponent,
    ],
    imports: [
        CommonModule,   
        RouterModule
    ],
    exports: [
        RouteComponent,
      ]
 })

export class RouteModule { }