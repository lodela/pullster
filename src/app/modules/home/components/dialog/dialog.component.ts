import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, Response } from '@models/index';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  private subjectKeyUp = new Subject<any>();
  private answerIndex!: number;
  private answers: number[] = [];
  public  allResponses: boolean = false;
  public  isDisabled: boolean = false;
  introMessage: string = 'We\'r Almost done. Need to confirm:'
  textBtn = {
    msg: '',
    init: 'Next Question',
    end: 'End Survey'
  };
  questionsLength!: number;
  questionsAnswered: boolean[] = [];
  questionType!: string;
  selected = 0;
  selectedOption!: string;
  selectedValue!: string | null;
  wrong: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = true;
  }

  @HostListener('window:keyup.esc') onKeyUp(){
    this.onNoClick();
  }

  ngOnInit(): void {
    this.clearData();
    this.data.survey!.questions.forEach((q, index) => {
      this.questionsAnswered.push(false);
      this.answerIndex = index;
      if(this.data.full === false){
        this.textBtn.msg = this.textBtn.end;
        (q.Type === 'Text' && q.Required) ? this.setResponse(q) : null
      }else{
        this.introMessage = `Please respond all ${this.questionsAnswered.length} questions.`;
        this.textBtn.msg = this.textBtn.init;
        this.setResponse(q);
      }
    });
    this.subjectKeyUp.pipe(debounceTime(700)).subscribe( d => {
      this.wrong = [];
      this.data.survey!.responses![this.selected].value = '';
      this.isDisabled = false;
      this.selectedResponse(d, 'Text');
    });
  }

  setResponse(q?: any): void {
    this.answers.push(Number(q.ID));
    this.newResponse();
  }

  newResponse(d?: any): void {
    const response = new Response();
          response.ID = this.data.survey!.questions[this.answerIndex].ID;
          response.questionId = this.data.survey!.id;
          response.questionIndex = this.answerIndex;
          response.key = this.data.survey!.questions[this.answerIndex].Text;
          response.value = d ? `${d}` : '';
          response.OrderPosition = this.answerIndex;
          response.Description = '';
          response.expectedResponse = `${this.data.survey!.questions[this.answerIndex].expectedResponse}`;
          response.type = this.data.survey!.questions[this.answerIndex].Type;

    this.data.survey!.responses!.push(response);
    this.isDisabled = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.clearData();
  }

  onAnswer(e: any, answerIndex?: number): void {
    const val = e? e.target.value : null;
    this.allResponses = false;
    this.subjectKeyUp.next(val);

  }

  selectedResponse(e: any, type: string): void {

    this.answerIndex = this.selected;
    const checked = 'Multi choice' === type? e.checked : true;
    const name    = 'Multi choice' === type? e.source.name : 'Text' === type? e : e.source.radioGroup._selected.id;
    const index   = this.wrong.indexOf(name);
    const value   = 'Text' != type? e.source.value : e;
    const isValue = value && value === this.data.survey!.responses![this.selected].expectedResponse;

    type && 'Single choice' === type ? this.wrong = [] : null;

    if(isValue){
      this.data.survey!.responses![this.selected].value = checked ? `${value}` : '';
      this.wrong = [];
    }else{
      (checked) ? this.wrong.push(name) : (index > -1) ? this.wrong.splice(index, 1) : null ;
      this.data.survey!.responses![this.selected].value = this.wrong.join(', ');
    }

  }

  onSaveSurvey(): void {
    this.allResponses = false;
    this.isDisabled = true;
    this.data.survey?.responses?.forEach(resp => {
      if(false === !!resp.value.trim()){
        this.allResponses = true;
      }
    });
    this.allResponses ? null : this.dialogRef.close(this.data);
  }

  clearData(): void{
    this.selected = 0;
    this.answers = [];
    this.wrong = [];
    this.data.survey?.responses?.splice(0,this.data.survey?.responses?.length);
  }

  next(back?: boolean) {
    this.selectedValue = null;
    const length = this.data.survey?.responses?.length;
    const lastQuestion = this.selected === length!-1;
    back ? this.selected-- : this.selected < length!-1 ? this.selected++ : this.selected ;
    this.textBtn.msg = (this.selected === length!-1) ? this.textBtn.end : this.textBtn.init;
    lastQuestion ? this.onSaveSurvey() : this.wrong = [];
  }
}
