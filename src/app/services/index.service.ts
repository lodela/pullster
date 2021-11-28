import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '@shared/base.service'


@Injectable({
  providedIn: 'root'
})
export class PullsterService extends BaseService {
  private url = `${this.apiUrl}/`;
  constructor(private http: HttpClient) {
    super();
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
}
