import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { Respondent } from '@models/index'


@Component({
  selector:    'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls:  ['./respondent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RespondentComponent {
  @Input() vm!: Respondent;
  @Input() active!: boolean;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  select() {
    this.selected.emit();
  }

}
