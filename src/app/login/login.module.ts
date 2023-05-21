import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';
import { RouteModule } from '../route/route.module';
import { TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,   
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TuiInputModule,
        CounterWrapperModule,
        RouteModule,
        TuiTextfieldControllerModule,
    ],
    exports: [
        LoginComponent,
      ]
 })

export class LoginModule { }