import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CatalogsComponent, SurveyComponent, DashboardComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: AdminComponent},
      {path: 'catalogs', component: CatalogsComponent},
      {path: 'survey', component: SurveyComponent},
      {path: 'dashboard', component: DashboardComponent}
    ]
  },
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
