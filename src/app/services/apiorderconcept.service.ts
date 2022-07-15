import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConceptOrder } from '../models';
import { Order } from '../models/order';
import { OrderX } from '../models/orderX';
import { Result } from '../models/result';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiorderconceptService {

  url: string = "https://localhost:7241/orderconcept";
  constructor(private _Http: HttpClient) { }
 
  create(order: ConceptOrder) : Observable<Result>
  {
    return this._Http.post<Result>(this.url, order, httpOption);
  }
  
  detail(order: ConceptOrder) : Observable<Result>
  {
    return this._Http.post<Result>("https://localhost:7241/order/detail", order, httpOption);
  }

  update(order: ConceptOrder) : Observable<Result>
  {
    return this._Http.put<Result>(this.url, order, httpOption);
  }

  read() : Observable<Result>
  {
    return this._Http.get<Result>(this.url);
  
  }

  select(id: number) : Observable<Result>
  {
    return this._Http.get<Result>(`${this.url}/${id}`);
  }

  delete(id: number) : Observable<Result>
  {
    return this._Http.delete<Result>(`${this.url}/${id}`);
  }
}
