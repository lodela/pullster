import { PendingComponent } from './pending/pending.component';
import { SurveyCardComponent } from './question-card/survey-card.component';
import { DialogComponent } from './dialog/dialog.component';
import { OptionsComponent } from './options/options.component';

export const components: any[] = [
  PendingComponent,
  SurveyCardComponent,
  DialogComponent,
  OptionsComponent
]

export * from './pending/pending.component';
export * from './question-card/survey-card.component';
export * from './dialog/dialog.component';
export * from './options/options.component';
