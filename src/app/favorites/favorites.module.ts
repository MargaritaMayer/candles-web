import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouteModule } from '../route/route.module';
import { RouterModule } from '@angular/router';
import { TuiCheckboxBlockModule, TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';



@NgModule({
    declarations: [
        FavoritesComponent,
    ],
    imports: [
        CommonModule, 
        RouteModule,
        RouterModule,
        TuiInputModule,
        FormsModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiCheckboxBlockModule,
    ],
    exports: [
        FavoritesComponent,
      ]
 })

export class FavoritesModule { }