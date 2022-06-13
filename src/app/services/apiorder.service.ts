import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Result } from '../models/result';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiorderService {

  url: string = "https://localhost:7241/order";
  constructor(private _Http: HttpClient) { }

  create(order: Order) : Observable<Result>
  {
    return this._Http.post<Result>(this.url, order, httpOption);
  }
} 
