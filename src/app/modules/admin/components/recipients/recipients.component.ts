import { Observable, Subject } from 'rxjs';
import { Component, EventEmitter, Output, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { IEmailListItem } from '@models/survey.models';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {

  @Output() onRecipientEnter: EventEmitter<string>= new EventEmitter();
  @Output() onDebounce: EventEmitter<string>= new EventEmitter();
  @Output() emailList: EventEmitter<string[]>= new EventEmitter();
  @Input() emailSuggestionList:  IEmailListItem[] = [];
  @Input() targetSurveyAudienceList:  IEmailListItem[] = [];
  @Input() allEmails: string[] = [];

  showSuggestions: boolean = false;
  debouncer: Subject<string> = new Subject();
  emailSearch: string = '';
  targetAudienceRecipients: IEmailListItem[] = [];
  targetAudience: string[] = [];
  targetAudienceRecipientsCtrl = new FormControl();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = [];

  private recipients = new Subject<any>();


  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;



  constructor() {
    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => (email ? this._filter(email) : this.allEmails.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmails.filter(email => email.toLowerCase().includes(filterValue));
  }


  add(event: MatChipInputEvent): void{
    const value = (event.value || '').trim();

    if(value){
      this.targetAudience.push(value);
    }
    event.input.value = '';
  }


  remove(email: string): void{
    const index = this.targetAudience.indexOf(email);
    if(index>=0){
      this.targetAudience.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(350))
    .subscribe(valor => {
        this.onDebounce.emit(valor);
    });
    this.recipients.subscribe({next: data => this.emailList.emit(data)});
  }

  search(){
    this.onRecipientEnter.emit(this.emailSearch);
  }

  keyPressed(){
    this.debouncer.next(this.emailSearch);
    this.showSuggestions = true;
  }

  addToTargetAudience(email: string): void {
    this.emailSearch = '';
    const value = (email.toLowerCase() || '').trim();
    if(value){
      this.targetAudience.push(value);
      this.recipients.next(this.targetAudience);
    }
    this.showSuggestions = false;
  }


}
