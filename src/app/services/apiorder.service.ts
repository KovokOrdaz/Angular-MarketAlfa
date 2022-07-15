import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models';
import { OrderPO } from '../models/orderPO';
import { OrderX } from '../models/orderX';
import { Result } from '../models/result';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {

  url: string = "https://localhost:7241/order";
  constructor(private _Http: HttpClient) { }
 
  create(order: Order) : Observable<Result>
  {
    return this._Http.post<Result>(this.url, order, httpOption);
  }
  
  createPO(order: OrderPO) : Observable<Result>
  {
    return this._Http.post<Result>(this.url, order, httpOption);
  }
  // detail(order: OrderX) : Observable<Result>
  // {
  //   return this._Http.post<Result>("https://localhost:7241/order/detail", order, httpOption);
  // }

  update(order: OrderX) : Observable<Result>
  {
    return this._Http.put<Result>(this.url, order, httpOption);
  }

  read() : Observable<Result>
  {
    return this._Http.get<Result>(this.url);
  }

  readInference() : Observable<Result>
  {
    return this._Http.get<Result>('https://localhost:7241/order/inference');
  }

  first() : Observable<Result>
  {
    return this._Http.get<Result>('https://localhost:7241/order/first');
  }

  detail(id: number) : Observable<Result>
  {
    return this._Http.get<Result>('https://localhost:7241/order/detail/' + id);
  }

  delete(id: number) : Observable<Result>
  {
    return this._Http.delete<Result>(`${this.url}/${id}`);
  }
} 
