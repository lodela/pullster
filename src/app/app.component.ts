import { Component, ViewChild, OnInit } from '@angular/core';
import { InquiryAppService } from '@services/index.service';
import { MatSidenav } from '@angular/material/sidenav';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AdminMenu, User } from '@models/index';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('drawer') drawer: any;

  title = 'Inquiry App';
  session = new Subject<string>();
  user: User = new User();
  users: Object[] = [];
  route: string = '';
  reason!: string;
  spinnerIsVissible: boolean = true;

  adminMenu: AdminMenu[] = [
    {
      goto: '/admin',
      icon: 'home',
      title: 'Main',
      subject: 'Main Admin Dashboard',
      disabled: false,
      description: 'A table with the surveys answered by date of week'
    },
    {
      goto: '/admin/survey',
      icon: 'admin_panel_settings',
      title: 'Surveys Pannel',
      subject: 'Admin Section',
      description: 'Create, Update or Delete a Survey...',
      disabled: false,
    },
    {
      goto: '/admin/survey/add',
      icon: 'add_circle',
      title: 'Add New Survey',
      subject: 'Admin Section',
      description: 'Create a New Survey',
      disabled: false,
    }
  ]

  constructor(
    private service: InquiryAppService,
    private location: Location,
    private router: Router,
    ){
      this.clearAll();
      this.service.getCurrentUserSession().subscribe(res => {
        // const token = res.ID;
        const token = '2dfbccae-422a-4e46-961a-b83f77b0b5ed';
        sessionStorage.setItem('Token', token);
        this.session.next(token);
      });
      router.events.subscribe(() => {
        this.route = location.path() !== '' ? location.path() : 'home';
      });
    }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.session.subscribe({next: id => this.getCurrentUser(`${id}`)});
  }

  toggleSideMenu(): void{
    this.drawer.toggle();
  }
  clearAll(): void {
    this.spinnerIsVissible = true;
    sessionStorage.clear();
    this.user = new User();
  }
  goto(goto: string): void {
    ('logout' === goto) ? this.clearAll() : null;
    this.drawer.close();
    goto = 'logout' === goto ? '/login' : goto;
    this.router.navigate([goto]).then( () => this.spinnerIsVissible = false );
  }
  save(): void{
    console.log('Save... ');
  }

  getCurrentUser(id?: string): void {
    this.service.getCurrentUser(id).subscribe(res => {
      res.id ? this.user = res : this.service.addNewUser().subscribe(res => this.user = res);
      this.user.id && this.goto('home');
    });
  }
}
