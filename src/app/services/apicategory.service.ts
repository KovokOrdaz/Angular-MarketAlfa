import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';
import { Category } from '../models/category';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  url = 'https://localhost:7241/category';

  constructor( private _http: HttpClient ) { }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url);
  }

  readName() : Observable<Result>
  {
    return this._http.get<Result>('https://localhost:7241/category/name');
  }
  
  readActive() : Observable<Result>
  {
    return this._http.get<Result>('https://localhost:7241/category/active');
  }

  create(entity: Category) : Observable<Result>
  {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Category) : Observable<Result>
  {
    return this._http.put<Result>(this.url, entity, httpOption);
  }
  delete(id: number) : Observable<Result>
  {
    return this._http.delete<Result>(`${this.url}/${id}`);
  }
}
