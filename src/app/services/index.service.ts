import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PullsterService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get<any>('https://localhost:44304/api/Identity/GetCurrentUser');
  }
}
