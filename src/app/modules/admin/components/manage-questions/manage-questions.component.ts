import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InquiryAppService } from '@services/index.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Survey, Question, IAnswerOptionType, Option, ISurvey, IQuestion } from '@models/index';
import { Title } from '@angular/platform-browser';
import { IAnswerOption, IInquiryToAddDto, IQuestionToAddDto, IAnswerOptionToAddDto, IEmailListItem } from '@models/survey.models';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.scss']
})
export class ManageQuestionsComponent implements OnInit, AfterViewInit {
  private sub: any;
  id!: string;
  surveyForm!: FormGroup;
  surveyAudience = '';
  route: string = '';
  title = {
    add:'New Survey',
    edit:''
  };
  selectedOption: string[] = [];
  surveyToEdit!: Survey;
  editMode = false;
  surveyTypes = [
    { id: 1, value: 'Training' },
    { id: 2, value: 'HR' },
    { id: 3, value: 'General Inquiry' },
    { id: 4, value: 'Health Screening' },

  ];

  answerOptionTypes: IAnswerOptionType[] = [
    { value: '1', viewValue: 'Single choice' },
    { value: '2', viewValue: 'Multi choice' },
    { value: '3', viewValue: 'Text' },
    { value: '4', viewValue: 'Rating' }
  ];


  questions: Question[] = [];
  surveyQuestions: FormArray = new FormArray([]);

  emailSuggestionList: IEmailListItem[] = [];
  targetSurveyAudienceList: IEmailListItem[] =[];
  allEmails: string[] =[];

  constructor(
    private fb: FormBuilder,
    private service: InquiryAppService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : '';
      this.id ? this.getSurvey(this.id) : null;
    });
    this.initForm();
  }

  ngAfterViewInit() {}

  private initForm() {
    const surveyTitle = '';
    const surveyType = '';
    const surveyDescription = '';
    const surveyQuestions = new FormArray([ ]);

    this.surveyForm = this.fb.group({
      surveyId: new FormControl(this.id),
      surveyTitle: new FormControl(surveyTitle, [Validators.required]),
      surveyDescription: new FormControl(surveyDescription, [Validators.required]),
      surveyAudience: new FormControl('', Validators.required ),
      surveyType: new FormControl(surveyType, [Validators.required]),
      surveyQuestions: this.surveyQuestions,
      isAnonymous: new FormControl(false, [Validators.required]),
    });
    this.onAddQuestion();
  }

  questionsFormArray(): FormArray {
    return this.surveyForm.get('surveyQuestions') as FormArray;
  }
  optionsFormArray(questionIndex: number): FormArray {
    return this.questionsFormArray().at(questionIndex).get('answerOptions') as FormArray;
  }

  suggestions(emailSearch: string){
    this.service.getEmailSuggestions(emailSearch).subscribe(data => {
      this.emailSuggestionList = data.splice(0,5);
      this.emailSuggestionList.forEach(item => {
        this.allEmails.push(item.emailAddress);
      });
    });
  }

  setEmailList(e: any): void{
    console.log(e);
    this.surveyAudience = e.join(',');
    this.surveyForm.get('surveyAudience')!.setValue(this.surveyAudience);
  }


  onAddQuestion() {

    const surveyQuestionItem = this.fb.group({
      questionTitle: this.fb.control('', Validators.required),
      answerOptionType: this.fb.control('', Validators.required),
      answerOptions: this.fb.array([])
    });


    (<FormArray>this.surveyForm.get('surveyQuestions')).push(surveyQuestionItem);

  }

  onAddAnswerOption(questionIndex: number):void {
    const answerOptionItem = this.fb.group({
      answerOptionOrderPositionId: this.fb.control('', null),
      answerOptionDescription: this.fb.control('', Validators.required),
      isExpectedResponse: this.fb.control(false, null)
    });

    this.optionsFormArray(questionIndex).push(answerOptionItem);
  }

  onRemoveQuestion(index: number): void{
    this.questionsFormArray().removeAt(index);
  }

  onRemoveAnwerOption(questionIndex:number, optionIndex: number): void{
    this.optionsFormArray(questionIndex).removeAt(optionIndex);
  }

  onSelectAnswerOptionType(e: any, index: number) {
    if (e.value === 'Single choice' || e.value === 'Multi choice') {
      this.onAddAnswerOption(index);
    }
  }

  addOptionControls(answerOptionType: string, i: number) {
    let options = new FormArray([]);
    let showRemarksBox = new FormControl(false);
    this.addOption(i);
  }

  onSaveSurvey():void {

    console.log(this.surveyForm.value);
    // debugger;


    const inquiryToAddDto: IInquiryToAddDto = {
      id:  this.surveyForm.value.surveyId,
      name: this.surveyForm.value.surveyTitle,
      description: this.surveyForm.value.surveyDescription,
      isAnonymous: this.surveyForm.value.isAnonymous,
      inquiryType: this.surveyForm.value.surveyType,
      frecuency: 1,
      audience: this.surveyForm.value.surveyAudience,
      start: new Date(),
      end: new Date(),
    }

    console.log(inquiryToAddDto);
    debugger;


    const inquiryResult: any = this.service.addInquiry(inquiryToAddDto).subscribe(data => {
      const inquiryId = data.id;
      for(let questionIndex = 0; questionIndex < this.questionsFormArray().length; questionIndex++) {
        const question = this.questionsFormArray().controls[questionIndex].value;
        const questToAddDto: IQuestionToAddDto ={
          id: 0,
          inquiryId: inquiryId,
          orderPosition: questionIndex,
          introduction: '',
          description: question.questionTitle,
          answerOptions: [],
          media: [],
          answerType: question.answerOptionType
        };

        //save question data
        let questionId: number = 0;
        const questionResult: any = this.service.addQuestion(questToAddDto).subscribe(data => {
          questionId = data.id;
          const options: FormArray = this.optionsFormArray(questionIndex)

          for(var optionIndex = 0; optionIndex < options.length; optionIndex++){

            const answerOptionToAddDto: IAnswerOptionToAddDto = {
              id: 0,
              questionId: questionId,
              orderPosition: optionIndex,
              description: options.controls[optionIndex].value.answerOptionDescription,
              expectedResponse: options.controls[optionIndex].value.isExpectedResponse
            }
            //save answeroption data
            const answerOptionResult: any = this.service.addAnswerOption(answerOptionToAddDto).subscribe(data => {
              //console.log(data);
            });
            questToAddDto.answerOptions.push(answerOptionToAddDto);
          }

        });

      }

    });
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  slideChange(event: MatSlideToggleChange){
    this.surveyForm.value.isAnonymous = event.checked;
  }

  addOption(i: number) {
    const optionGroup = new FormGroup({
      optionText: new FormControl('', Validators.required),
    });
    // (<FormArray>(this.surveyForm.controls.surveyQuestions['controls'][i].controls.questionGroup.controls.options)).push(optionGroup);
  }

  removeOption(questionIndex: number, itemIndex: number) {
    // (<FormArray>(this.surveyForm.controls.surveyQuestions['controls'][questionIndex].controls.questionGroup.controls.options)).removeAt(itemIndex);
  }

  getSurvey(id: string): void{
    this.service.getSurvey(id).subscribe(
      res => {
        this.surveyToEdit = res;
        this.title.edit = `Edit Survey: ${this.surveyToEdit.title}`;
        this.setValuesToEdit();
      }
    );
  }

  setValuesToEdit(): void{
    this.surveyForm.controls['surveyTitle'].setValue(this.surveyToEdit.title);
    this.surveyForm.controls['surveyType'].setValue(this.surveyToEdit.type);

    // Object.keys(this.surveyForm.controls).forEach(field => {
    //   console.log(field);

               //      let value = this.surveyForm.get(field)!.value;
    //       value = null === value ? '' : value.trim();

    //   this.surveyForm.get(field)!.setValue(value);
               //      this.surveyForm.get(field)!.markAsTouched({ onlySelf: true });
               // });
  }



  postSurvey(): void {
    let formData = this.surveyForm.value;
  }

  onSubmit(): void {
    this.postSurvey();
  }
}
