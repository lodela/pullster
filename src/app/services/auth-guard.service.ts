import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { InquiryAppService } from './index.service';
import { User } from '@models/index';

import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  token = `${sessionStorage.getItem('Token')}`;
  isAdmin = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: InquiryAppService
  ) {
    this.http.getCurrentUser(this.token).subscribe(res => {this.isAdmin.next(res.admin)});
  }

  canActivate(): Observable<boolean> {
    if(false === !!this.token){
      this.router.navigate(['login']);
      return of(false);
    }else {
      this.http.getCurrentUser(this.token).subscribe(res => {this.isAdmin.next(res.admin)});
      return this.isAdmin.asObservable();
    }
  }

}
