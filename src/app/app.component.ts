import { Component, ViewChild, OnInit } from '@angular/core';
import { PullsterService } from './services/index.service';
import { MatSidenav } from '@angular/material/sidenav';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AdminMenu } from '@models/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('drawer') drawer: any;

  title = 'Inquiry App';
  users: Object[] = [];
  route: string = '';
  reason!: string;

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
      goto: '/admin/catalogs',
      icon: 'dashboard_customize',
      title: 'Survey Catalogs',
      subject: 'Campaign Admin',
      description: 'Campaigns Section',
      disabled: true,
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
      goto: '/admin/dashboard',
      icon: 'poll',
      title: 'Dashboard',
      subject: 'Charts and Statistics'
    }
  ]

  constructor(
    private service: PullsterService,
    private location: Location,
    private router: Router
    ){
      router.events.subscribe(() => {
        this.route = location.path() !== '' ? location.path() : 'home';
      });
    }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }
  toggleSideMenu(): void{
    this.drawer.toggle();
  }
  goto(goto: string): void {
    this.drawer.close();
    goto = 'logout' === goto ? '/login' : goto;
    if('logout' === goto){
      //se cierra la sesion del localSesion then() redireccionamos al login
      console.log('logout');
    }
    this.router.navigate([goto]);
  }
  save(): void{
    console.log('Save... ');
  }

}
