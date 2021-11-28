import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallInterceptor } from './interceptors/api-call-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const DECLARATIONS = [
	CommonModule
];

@NgModule({
  declarations: [],
  imports: DECLARATIONS,
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiCallInterceptor,
			multi: true
		}
	]
})
export class SharedModule { }
