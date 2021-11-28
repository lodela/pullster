import { User } from './index';

export class Survey{

  static createBlank(): Survey {
    return new Survey();
  }

  clone(): Survey {
    return new Survey(this.type, this.title, this.isDeleted, this.isAnonymous, this.questions, this.responses, this.subTitle, this.intro, this.buttonText, this.extraButton, this.extraButtonText, this.id);
  }

  constructor(
    public type : string = '',
    public title: string = '',
    public isDeleted: boolean = false,
    public isAnonymous : boolean = false,
    public questions: Question[] = [new Question()],

    public responses?: Response[],
    public subTitle?: string,
    public intro?: string,

    public buttonText?: string,
    public extraButton?: boolean,
    public extraButtonText?: string | null,

    public image?: string,
    public recipients?: string[],

    public id?: any
  ){}
}

export class Question{
  static createBlank(){ return new Question(); }
  constructor(
    public ID: number | null = null,
    public Type: string = '',
    public Text: string = '',
    public Options: Option[] = [],
    public Required: boolean = false,
    public Remarks: string = '',
    public hasRemarks : boolean = false,
    public expectedResponse?: number | null
  ){}
}

export class Option{
  static createBlank(){ return new Option();}
  constructor(
    public ID?: number,
    public questionID?: number,
    public orderPosition? : number,
    public OptionText: string = '',
    public OptionColor: string = '',
    public hasRemarks: boolean = false,
    public expectedResponse?: boolean
  ){}
}

export interface QuestionType {
  value: string;
  viewValue: string;
}

export class Response {
  static createBlank(){ return new Response();}
  json(){
    const obj = new Response(this.ID, this.questionId, this.questionIndex, this.key, this.value, this.OrderPosition, this.Description, this.expectedResponse);
    return JSON.stringify(obj);
  }
  constructor(
    public ID: number | null = null,
    public questionId: string = '',
    public questionIndex?: number,
    public key: string = '',
    public value: string = '',
    public OrderPosition?: number,
    public Description?: string,
    public expectedResponse?: string,
    public type?: string
  ){}
}

export class Category {
  constructor(
    public id: number,
    public name:string,
    public hasSubCategory: boolean,
    public parentId: number
  ){}
}

export interface DialogData {
  user: User,
  survey?: Survey,
  full?: boolean,
}


/********************************* DTOs as API works********************************/
export interface IEmailListItem{
displayName: string;
emailAddress: string;
}

export interface IInquiryToAddDto{
  id: number;
  name: string;
  description: string;
  isAnonymous: boolean;
  inquiryType: number;
  frecuency: number;
  audience: string;
  start: Date;
  end: Date;
}
export interface IQuestionToAddDto{
  id: number;
  inquiryId: number;
  orderPosition: number;
  introduction: string;
  description: string;
  media: IMediaDisplayDto[];
  answerOptions: IAnswerOptionToAddDto[];
  answerType: number;
}
export interface IAnswerOptionToAddDto {
  id: number;
  questionId: number;
  orderPosition:number;
  description: string;
  expectedResponse: boolean;
}
export interface IMediaDisplayDto{
  id: number;
  questionId: number;
  url: string;
}
/****************************************************************/
export interface ISurvey{
  ID: number;
  Type : string;
  Title: string;
  IsDeleted: boolean;
  IsAnonymous : boolean;
  Questions: IQuestion[];
}
export interface IQuestion{

    id: number;
    answerOptionType: number;
    description: string;
    answerOptions: IAnswerOption[];
    required: boolean;
    remarks: string;
    hasRemarks : boolean;
}
export interface IAnswerOption {
  id: number;
  questionId: number;
  orderPosition:number;
  description: string;
  isExpectedResponse: boolean;
}
export interface IAnswerOptionType {
  value: string;
  viewValue: string;
}
export interface QuestionType {
  value: string;
  viewValue: string;
}
