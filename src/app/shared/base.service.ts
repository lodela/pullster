import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl = environment.apiUrl;
  ApiUrl = environment.ApiUrl;
  constructor() { }
}
