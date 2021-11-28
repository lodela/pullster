import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from '@modules/login/login.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@modules/material/material.module';

const IMPORTS =[
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  FormsModule, ReactiveFormsModule,
  MaterialModule,
  LoginModule
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: IMPORTS,
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule { }
