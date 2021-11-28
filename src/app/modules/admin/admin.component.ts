import { Component, OnInit } from '@angular/core';
import { Respondent } from '@models/index';
import { InquiryAppService } from '@services/index.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users!: Respondent[];
  countResults: number = 0;
  selectedUser!: Respondent;
  showCard: boolean = false;

  constructor( private service: InquiryAppService) { }

  ngOnInit(): void {
    this.showCard = false;
    this.service.getAnswers().subscribe(res => {
      this.users = res;
      this.countResults = res.length;
    });

    // this.users = this.service.getAnswersMoc();
    // this.countResults = this.users.length;
  }

  selectUser(user: Respondent) {
    this.selectedUser = user;
    this.showCard = true;
  }

  save(user: Respondent): void{
    this.showCard = false;
    this.closeUser();
  }

  closeUser(): void{
    this.showCard = false;
    this.selectedUser = Respondent.createBlank();
  }

}
