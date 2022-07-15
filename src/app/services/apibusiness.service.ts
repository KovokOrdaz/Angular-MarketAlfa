import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Business } from '../models/business';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiBusinessService {

  url = 'https://localhost:7241/business';

  constructor( private _http: HttpClient ) { }

  exist() : Observable<Result>
  {
    return this._http.get<Result>('https://localhost:7241/business/exist');
  }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url);
  }

  create(entity: Business) : Observable<Result>
  {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Business) : Observable<Result>
  {
    return this._http.put<Result>(this.url, entity, httpOption);
  }
}