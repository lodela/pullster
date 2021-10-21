import { Component, OnInit } from '@angular/core';
import { PullsterService } from './services/index.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pullster';

  constructor(private service: PullsterService){}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      console.log(data);
    })
  }
}
