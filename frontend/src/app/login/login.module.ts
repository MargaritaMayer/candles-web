import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { CounterWrapperModule } from '../counter-wrapper/counter-wrapper.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,   
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CounterWrapperModule,
    ],
    exports: [
        LoginComponent,
      ]
 })

export class LoginModule { }