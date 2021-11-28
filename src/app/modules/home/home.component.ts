import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components';
import { InquiryAppService } from '@services/index.service';
import { Survey, DialogData, User, Respondent, Message, WrongAnswers } from '@models/index';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!: User;
  dialogData!: DialogData
  surveys!: Survey[];
  visibleSurvey: boolean[] = [];
  selectedSurvey!: Survey;
  pending: number = 0;
  firstImage = 500;
  images: string[] = [];
  todayDate!: number;

  constructor(
    private router: Router,
    private http: InquiryAppService,
    public dialog: MatDialog
  ) {
    if(false === !!sessionStorage.getItem('Token')){
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.http.getCurrentUser().subscribe(res => this.user = res);
    this.todayDate = this.http.getDate();
  }

  ngAfterViewInit(): void {
    this.getSurveys();
  }

  getSurveys(): void{
    this.http.getSurveys().subscribe(
      res => {
        this.surveys = res;
      },
      error => console.log(`Error: ${error}`),
      () => {
        this.pending = this.surveys.length;
        this.surveys.length ? this.surveys.forEach(e => {
          this.alreadyResponded(e.id, this.todayDate).subscribe((res: Message) => {
            e.image = `https://unsplash.it/${this.firstImage ++}`;
            this.visibleSurvey.push(res.message.includes('Not'));
            res.message.includes('Not') ? null : this.pending-- ;
          });
        }) : null;
      }
    );
  }

  alreadyResponded(surveyId: string, date: number): Observable<Message> {
    return this.http.alreadyResponded(surveyId, date.toString(), this.user.id);
  }

  takeSurvey(survey: Survey, i: number, full?: boolean){
    this.selectedSurvey = survey;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: full ? '400px' : '300px',
      data: {user:this.user, survey:this.selectedSurvey,disableClose: true, full}
    });
    dialogRef.afterClosed().subscribe(
      res => { res? this.mapResponses(res, i) : null },
      err => { console.error(`Error: ${err}`)}
    )
  }

  mapResponses(res: DialogData, i: number): void {

    this.visibleSurvey.splice(i,1,false);
    this.pending--

    let count: number = 0;
    let status: string;
    let tags = ["health_and_safety", "vaccines"];
    let values = new Array<string>();
    let wrong = new Array;
    let w : WrongAnswers;

    res.survey?.responses?.forEach(r => {
      if(r.expectedResponse !== r.value){
        values = r.value.split(',');
        count = count + values.length;
        r.key = r.key.includes('temperature?')? 'Temperature: ' : r.key.includes('Are you experiencing any or the combination')? 'Symptoms: ' : r.key.includes('Are you in close contact with a person') ? 'Close contact or a compromised place: ' : r.key;
        (r.key.includes('Temperature:') || r.key.includes('Any other symptoms?') && r.value.toUpperCase() === 'NO')? count-- : null;
        w = new WrongAnswers(r.key, r.value.toUpperCase());
        wrong.push(w);
      }
    });

    status = count >= 3? 'danger' : count < 2 ? 'Ok' : 'warning';
    const respondent = new Respondent(res.user.name, res.user.lastName, res.user.id, tags, status, [], wrong, this.todayDate, res.survey?.id);

    this.saveResponse(respondent);
  }

  saveResponse(data: Respondent): void {
    this.http.saveResponse(data).subscribe();
  }

}
