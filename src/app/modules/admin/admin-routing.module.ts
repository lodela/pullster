import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { CatalogsComponent, SurveyComponent, DashboardComponent, AddEditComponent, ManageQuestionsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: AdminComponent, canActivate: [AuthGuard]},
      {path: 'catalogs', component: CatalogsComponent, canActivate: [AuthGuard]},
      {
        path: 'survey',
        children: [
          { path:'', component: SurveyComponent },
          // { path: 'add', component: ManageQuestionsComponent },
          // { path: 'edit/:id', component: ManageQuestionsComponent }
          { path: 'add', component: AddEditComponent },
          { path: 'edit/:id', component: AddEditComponent }
        ],
        canActivate: [AuthGuard]
      },
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
    ]
  },
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }

