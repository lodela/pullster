import { Component,OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import { Response, Option } from '@models/index';

@Component({
  selector: 'questionCard',
  templateUrl: './survey-card.component.html',
  styleUrls: ['../dialog/dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyCardComponent implements OnInit {
  @Input('question') q!: Response;
  @Input('options') opts!: Option[];
  @Output() response: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.q);
    console.log(this.opts);
  }

  selectedResponse(e: any): void {
  }

}
