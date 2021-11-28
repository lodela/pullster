import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { InquiryAppService } from '@services/index.service';
import { Survey, DialogData, User, Respondent, Message, WrongAnswers } from '@models/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements AfterViewInit, OnInit {

  title = 'Surveys Pannel';
  surveys!: Survey[];
  firstImage = 500;
  countResults: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InquiryAppService

  ) { }

  ngAfterViewInit(): void {
    this.service.getSurveys().subscribe(
      res => {
        this.surveys = res;
        this.countResults = res.length;
        this.setImages();
      }
    );
  }

  ngOnInit(): void {}

  setImages(): void {
    this.surveys.length ? this.surveys.forEach(e => {
      e.image = `https://unsplash.it/${this.firstImage ++}`;
    }) : null;
  }

  onAddSurvey(): void{
    this.router.navigate(['add'], {relativeTo: this.route});
  }
  onEditSurvey(id: string): void{
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

}
