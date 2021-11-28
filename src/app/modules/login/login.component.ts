import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { InquiryAppService } from '@services/index.service';

import { User } from '@models/index';
import { Subject } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private user!: User;
  session = new Subject<string>();
  constructor(
    private router: Router,
    private http: InquiryAppService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.session.subscribe({next: id => this.getCurrentUser(`${id}`)});
  }

  isUserLoged(): boolean {
    console.log(this.user);
    return this.user? true : false;
  }

  logon():void {
    // this.http.getCredentials('cecilia').subscribe(res => {
    //   sessionStorage.setItem('Token', res.ID);
    // });
    window.location.reload();
  }

  userFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  getCurrentUser(id?: string): void {
    console.log(id);
    this.http.getCurrentUser(id).subscribe(res => {
      res.id ? this.user = res : this.http.addNewUser().subscribe(res => this.user = res);
      this.user.id && this.router.navigate(['home']);
    });
  }

}
