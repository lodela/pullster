import { HttpClient }   from '@angular/common/http';
import { Injectable }   from '@angular/core';
import { BaseService }  from '@shared/base.service';
import { Observable, throwError, of, pipe, Subscription } from 'rxjs';
import { Respondent, Survey, Message, User, ISurvey, IInquiryToAddDto, IQuestionToAddDto, IAnswerOptionToAddDto} from '@models/index';
import { catchError, map, filter, tap, switchMap } from 'rxjs/operators';
import { T } from '@angular/cdk/keycodes';
@Injectable({
  providedIn: 'root'
})
export class InquiryAppService extends BaseService {

  private url = `${this.apiUrl}/`;
  private mail = `${this.ApiUrl}`;
  private usr = `${this.ApiUrl}`;


  user!: User;
  newId!: string;

  constructor(private http: HttpClient) {
    super();
  }

  getCurrentUserSession(): Observable<User> {
    return this.http.get<any>(`${this.usr}/Identity/GetCurrentUser`, { withCredentials: true }).pipe(
      map( res => this.user = new User(res.guid, '', res.givenName, res.surname, res.distinguishedName.split(',').find( (el: string) => el.includes('_Office')).split('=')[1], !!res.distinguishedName.split(',').find( (el: string) => el.includes('HR'))))
    )
  }

  getCredentials(userName: string): Observable<User>{
    return this.http.get<any>(`${this.usr}/Identity/FindDomainUser/${userName}`, { withCredentials: true }).pipe(
      map( res => this.user = new User(res[0].guid, '', res[0].givenName, res[0].surname, res[0].distinguishedName.split(',').find( (el: string) => el.includes('_Office')).split('=')[1], !!res[0].distinguishedName.split(',').find( (el: string) => el.includes('HR'))))
    )
  }

  getCurrentUser(id?:string | null): Observable<User>  {
    id = id ? id : sessionStorage.getItem('Token')? sessionStorage.getItem('Token') : null;
    return this.http.get<User>(`${this.apiUrl}/user/${id}`).pipe(map( (res: User) => res ? new User('', res.id, res.name, res.lastName, res.location, res.admin) : new User() ));
  }

  addNewUser(): Observable<User>{
    const body = {
      ID: this.user.ID,
      name: this.user.name,
      lastName: this.user.lastName,
      location: this.user.location,
      admin: this.user.admin
    }
    return this.http.post<User>(`${this.apiUrl}/user`, body).pipe(map(res => new User('',res.id,res.name,res.lastName,res.location,res.admin)));
  }

  isAdmin(id:string){
    return this.http.get<User>(`${this.apiUrl}/user/${id}`).pipe(
      map( res => res? res.admin : false)
    );
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  //---------------------------------- ANSWERS & RESPONSES ---------------------------------- //

  getAnswers(): Observable<Respondent[]>{
    return this.http.get<Respondent[]>(`${this.apiUrl}/inquiryResult`);
  }

  saveResponse(data?: Respondent): Observable<Respondent>{
    return this.http.post<Respondent>(`${this.apiUrl}/inquiryResult`, data);
  }

  alreadyResponded(surveyId:string,date:string,userId:string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/inquiryResult/${surveyId}/${date}/${userId}`)
  }

  //---------------------------------- SURVEY_SERVICES ---------------------------------- //

  addSurvey(survey: ISurvey): Observable<any> {
    const url = `${this.apiUrl}/Inquiry`;
		return this.http.post<any>(url, survey, { withCredentials: true}).pipe(
			catchError((error: Error[]) => {
				return throwError(error);
			})
		);
  }

  addInquiry(inquiryToAddDto: IInquiryToAddDto): Observable<any> {
    const url = `${this.ApiUrl}/Inquiry`;
		return this.http.post<IInquiryToAddDto>(url, inquiryToAddDto, { withCredentials: true}).pipe(
			catchError((error: Error[]) => {
				return throwError(error);
			})
		);
  }

  addQuestion(questioToAddDto: IQuestionToAddDto): Observable<any> {
    // const url = `${this.url}/Question`;
    const url = `${this.ApiUrl}/Question`;
		return this.http.post<IQuestionToAddDto>(url, questioToAddDto, {withCredentials: true}).pipe(
			catchError((error: Error[]) => {
				return throwError(error);
			})
		);
  }

  addAnswerOption(answerOptionToAddDto: IAnswerOptionToAddDto): Observable<any>{
    // const url = `${this.url}/AnswerOption`;
    const url = `${this.ApiUrl}/AnswerOption`;
		return this.http.post<IAnswerOptionToAddDto>(url, answerOptionToAddDto, {withCredentials: true}).pipe(
			catchError((error: Error[]) => {
				return throwError(error);
			})
		);
  }

  //---------------------------------- GET Survey Services ---------------------------------- //

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.apiUrl}/inquiry`);
  }

  getSurvey(id: string): Observable<Survey>{
    return this.http.get<Survey>(`${this.apiUrl}/inquiry/${id}`);
  }

  //---------------------------------- email services ---------------------------------- //

  getEmailSuggestions(email: string): Observable<any> {
    return this.http.get<any>(`${this.mail}/Identity/GetEmailSuggestions/${email}`, { withCredentials: true }).pipe(
      catchError((error: Error[]) => {
        return throwError(error);
      })
    );
  }

  //---------------------------------- Number of Day (01 to 365) ---------------------------------- //
  getNumberOfDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  //---------------------------------- Formated Date: YYYY/MM/DD ---------------------------------- //
  getDate(){
    let month = new Date().getMonth() + 1;
        month = month.toString().length === 1? 0+month : month ;
    let day   = new Date().getDate();
        day   = day.toString().length === 1 ? 0+day : day;
    const date = `${new Date().getFullYear()}${month}${day}`;
    return Number(date);
  }

}

