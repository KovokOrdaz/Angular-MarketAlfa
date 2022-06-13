import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Result } from '../models/result';
import { Employee } from '../models/employee';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiEmployeeService {
  url = 'https://localhost:7241/employee';

  constructor( private _http: HttpClient ) { }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url); 
    //return this._http.get<Result>(this.url).pipe(map(response => { return response.data.map((x: Employee) => Employee.Fill(x))}));
  }

  create(entity: Employee) : Observable<Result>
  {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Employee) : Observable<Result>
  {
    return this._http.put<Result>(this.url, entity, httpOption);
  }
  delete(id: number) : Observable<Result>
  {
    return this._http.delete<Result>(`${this.url}/${id}`);
  }
}
