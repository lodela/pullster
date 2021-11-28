import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InquiryAppService } from '@services/index.service';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Survey, QuestionType, Question, Option } from '@models/index';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, AfterViewInit {
  private sub: any;
  id!: string;

  surveyForm: FormGroup = new FormGroup({
    title: new FormControl(),
    subTitle: new FormControl(),
    intro: new FormControl(),
    type: new FormControl(),
    isAnonymous: new FormControl(),
    responses: new FormControl(),
    buttonText: new FormControl(),
    extraButton: new FormControl(),
    recipients: new FormControl(),
    questions: new FormControl(),
  });

  submited: boolean = false;
  route: string = '';
  title = {
    add:'New Survey',
    edit:''
  };
  selectedOption: string[] = [];
  survey!: Survey;
  editMode = false;
  surveyTypes = [
    { id: 1, value: 'Training' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'General Inquiry' },
    { id: 4, value: 'Health Screening' },

  ];

  answerOptionTypes: QuestionType[] = [
    { value: '1', viewValue: 'Single choice' },
    { value: '2', viewValue: 'Multi choice' },
    { value: '3', viewValue: 'Text' },
    { value: '4', viewValue: 'Rating' }
  ];

  optionTypes = [
    { key: '1', value: 'Single choice' },
    { key: '2', value: 'Multi choice' },
    { key: '3', value: 'Text' },
    { key: '4', value: 'Rating' }
  ];

  allEmails: string[] =[];

  constructor(
    private service: InquiryAppService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.id ? this.getSurvey(this.id) : this.newSurvey();
    });
  }

  ngAfterViewInit() {}

  get f() { return this.surveyForm.controls; }
  get questions() {
    return <FormArray>this.surveyForm.controls['questions'];
  }

  initForm(): void{
    let questions = new FormArray([]);
    this.surveyForm = this.fb.group({
      title:       [this.survey?.title, [Validators.required, Validators.maxLength(100)]],
      type:        [this.survey?.type, Validators.required],
      isAnonymous: [this.survey.isAnonymous],
      // responses:   [this.survey.responses, Validators.required],
      subTitle:    [this.survey?.subTitle, Validators.required],
      intro:       [this.survey?.intro, Validators.required],
      buttonText:  [this.survey?.buttonText, Validators.required],
      extraButton: [this.survey?.extraButton],
      recipients:  [this.survey?.recipients, Validators.required],
      questions: questions
    });

    this.addQuestion();

  }
  addQuestion(): void{
    const questionItem = new FormGroup({
      Text: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      questionGroup: new FormGroup({})

    });
    (<FormArray>this.surveyForm.get('questions')).push(questionItem);
  }

  deleteQuestion(i: number): void {
    console.log(i);
  }

  newSurvey(): void {
    this.survey = new Survey();
  }

  getSurvey(id: string): void{
    this.service.getSurvey(id).subscribe(
      res => {
        this.survey = res;
        this.title.edit = `Edit Survey: ${this.survey.title}`;
        this.initForm();
        this.setData();
      }
    );
  }

  onAddQuestion(): void {
    // console.log(this.survey);
    console.log(this.surveyForm);
  }

  onRemoveQuestion(i:number): void{}

  onSeletQuestionType(option:string, i:number): void{}

  postSurvey(): void {
    let formData = this.surveyForm.value;
    console.log(formData);
  }

  onSubmit(): void {
    this.postSurvey();
  }

  validateForm(): void{
    Object.keys(this.surveyForm.controls).forEach(field => {
			let value = this.surveyForm.get(field)!.value;
			value = null === value ? '' : value.trim();
			this.surveyForm.get(field)!.setValue(value);
			this.surveyForm.get(field)!.markAsTouched({ onlySelf: true });
		});
  }

  setData(): void {
    this.survey.questions.forEach((e, i) => {
      console.log(i);
      console.log(e);
      debugger;
      const questionItem = new FormGroup({
        Text: new FormControl(e.Text, Validators.required),
        Type: new FormControl(e.Type, Validators.required),
        questionGroup: new FormGroup({}),
      });
      (<FormArray>this.surveyForm.get('questions')).push(questionItem);
      this.addOption(e.Type, i);
    });
    console.log(this.surveyForm.value);
  }

  addOption(questionType: string, i:number): void {
    let options = new FormArray([]);
    let showRemarksBox = new FormControl(false);

    console.log();



    // <FormArray>this.questions['controls'][i].controls.questions.addControl('options',options);
  }

}
