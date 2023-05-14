import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouteModule } from '../route/route.module';


@NgModule({
    declarations: [
        ContactsComponent,
    ],
    imports: [
        CommonModule, 
        RouteModule,  
    ],
    exports: [
        ContactsComponent,
      ]
 })

export class ContactsModule { }