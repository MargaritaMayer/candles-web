import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        TuiButtonModule,
    ],
    exports: [
      HomeComponent,
      ]
 })

export class MainPageModule { }
