export class Respondent {

  static createBlank(): Respondent {
    return new Respondent();
  }

  clone(): Respondent {
    return new Respondent(this.name, this.lastName, this.userId, this.tags, this.status, this.notes, this.wrong, this.date, this.surveyId, this.id);
  }

  get fullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  constructor(
    public name: string = '',
    public lastName: string = '',
    public userId: string = '',
    public tags: string[] = [],
    public status: string = '',
    public notes?: Notes[],
    public wrong: WrongAnswers[] = [],
    public date?: number,
    public surveyId?: string,
    public id?: string
  ) {}
}

interface Notes {
  by: string;
  date: string;
  note: string;
}
export class WrongAnswers {
  constructor(
    public key: string = '',
    public value: string = ''
  ){}
}

export interface Message{
  message: string;
}

