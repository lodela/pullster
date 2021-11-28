import { CatalogsComponent } from './catalogs/catalogs.component';
import { SurveyComponent } from './survey/survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { RespondentComponent } from './respondent/respondent.component';
import { NotesCardComponent } from './respondent/notes-card/notes-card.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { RecipientsComponent } from './recipients/recipients.component';

export const components: any[] = [
  CatalogsComponent,
  SurveyComponent,
  DashboardComponent,
  AddEditComponent,
  ManageQuestionsComponent,
  RespondentComponent,
  NotesCardComponent,
  RecipientsComponent
]

export * from './catalogs/catalogs.component';
export * from './survey/survey.component';
export * from './dashboard/dashboard.component';
export * from './add-edit/add-edit.component';
export * from './manage-questions/manage-questions.component';
export * from './recipients/recipients.component';
export * from './respondent/respondent.component';
export * from './respondent/notes-card/notes-card.component';
