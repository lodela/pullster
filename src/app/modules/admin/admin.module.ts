import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import * as fromComponents from './components';

import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    AdminComponent,
    fromComponents.components,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AdminModule { }

