import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteModule } from '../route/route.module';
import { RouterModule } from '@angular/router';
import { TuiCheckboxBlockModule, TuiCheckboxLabeledModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiInputPasswordModule, TuiInputPhoneModule, TuiInputSliderModule, TuiInputTimeModule, TuiRadioBlockModule, TuiSelectModule, TuiStepperModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_TEXTFIELD_LABEL_OUTSIDE, TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiTextfieldControllerModule, TuiTextfieldLabelOutsideDirective } from '@taiga-ui/core';
import { AccountComponent } from './account.component';
import { TuiLetModule } from '@taiga-ui/cdk';

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
        TuiLetModule,
        TuiInputDateModule,
        TuiErrorModule,
        TuiInputPasswordModule,
        TuiInputNumberModule,
        TuiInputPhoneModule,
        TuiRadioBlockModule,
        TuiInputTimeModule,
        TuiCheckboxLabeledModule,
        
        





    ],
    exports: [
        AccountComponent,
    ]
 })
 export class AccountModule { }