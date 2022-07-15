import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiLegalStructureService {
    url = 'https://localhost:7241/legalstruture';
  
    constructor( private _http: HttpClient ) { }
  
    read() : Observable<Result>
    {
      return this._http.get<Result>(this.url);
    }
}
