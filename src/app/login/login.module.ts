import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';
import { RouteModule } from '../route/route.module';
import { TuiButtonModule, TuiErrorModule, TuiModeModule, TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiFieldErrorPipeModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,   
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        CounterWrapperModule,
        RouteModule,
        TuiTextfieldControllerModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        CommonModule,
        TuiCheckboxLabeledModule,
       
        TuiModeModule,
    ],
    exports: [
        LoginComponent,
      ]
 })

export class LoginModule { }