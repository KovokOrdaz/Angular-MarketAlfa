import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Distributor } from '../models/distributor';

@Injectable({
  providedIn: 'root'
})
export class ApiDistributorService {

  url = 'https://localhost:7241/distributor';

  constructor( private _http: HttpClient ) { }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url); 
    //return this._http.get<Result>(this.url).pipe(map(response => { return response.data.map((x: Employee) => Employee.Fill(x))}));
  }
}