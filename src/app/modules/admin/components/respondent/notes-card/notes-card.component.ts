import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Respondent } from '@models/index';

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NotesCardComponent {

  @Input() vm!: Respondent;
  @Output() save: EventEmitter<Respondent> = new EventEmitter<Respondent>();
  @Output() close: EventEmitter<Respondent> = new EventEmitter<Respondent>();

  newNote = '';

  addNewNote(): void{
    if(this.newNote.trim().length > 0){
      const today = new Date();
      const note = {
        by:'Norberto Lodela',
        date: today.toLocaleString(),
        note: this.newNote
      }
      this.vm.notes?.unshift(note);
      this.newNote = '';
    }
  }

  onSave(): void{
    this.save.emit(this.vm);
  }

  closeUser(): void{
    this.close.emit(this.vm);
  }

}
