import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorHandler } from '../helpers/global-error-handler';

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {
  constructor(private globalErrorHandler: GlobalErrorHandler) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
          if (error && error.error && error.error.hasOwnProperty("friendlyMessage")) {
              this.globalErrorHandler.handleFriendlyError(error.error);
          } else if (error && error.error) {
              const errorToLog = `Http error (unsuccessful reponse). Message: ${error.message}, status code: ${(error).status}, body: ${JSON.stringify(error.error)}`;
              this.globalErrorHandler.handleError(errorToLog);
          } else {
              const errorToLog = `Http error (unsuccessful reponse). Message: ${error.message}, status code: ${(error).status}, body: ${JSON.stringify(error)}`;
              this.globalErrorHandler.handleError(errorToLog);
        }
        
          return throwError(error.error);
      }));
    }
}
