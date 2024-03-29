import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {
    // HTTP Interceptors allow us to intercept an ongoing request and do something with it or its response
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
          withCredentials: true
      });
      return next.handle(request);
  }
}
