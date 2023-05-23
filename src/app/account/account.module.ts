import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteModule } from '../route/route.module';
import { RouterModule } from '@angular/router';
import { TuiCheckboxBlockModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule, TuiInputSliderModule, TuiSelectModule, TuiStepperModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_TEXTFIELD_LABEL_OUTSIDE, TuiButtonModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule, TuiTextfieldLabelOutsideDirective } from '@taiga-ui/core';
import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent
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
        TuiFieldErrorPipeModule,
        TuiInputSliderModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiGroupModule,
        TuiStepperModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        
        





    ],
    exports: [
        AccountComponent,
    ]
 })
 export class AccountModule { }