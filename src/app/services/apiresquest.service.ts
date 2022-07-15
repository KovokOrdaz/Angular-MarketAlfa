import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderX } from '../models/orderX';
import { RequestX } from '../models/request';
import { RequestVM } from '../models/requestVM';
import { Result } from '../models/result';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiresquestService {
  url: string = "https://localhost:7241/request";
  constructor(private _Http: HttpClient) { }

  create(master: RequestVM): Observable<Result> {
    console.log(master);
    return this._Http.post<Result>(this.url, master, httpOption);
  }

  read(): Observable<Result> {
    return this._Http.get<Result>(this.url);
  }

  readCode(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/request/code");
  }

  getRead(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/request/read");
  }

  get(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/request");
  }

  detail(id: number): Observable<Result> {
    return this._Http.get<Result>('https://localhost:7241/request/detail/' + id);
  }

  select(id: number): Observable<Result> {
    return this._Http.get<Result>(`${this.url}/${id}`);
  }

  selectProduct(id: number): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/request/product/" + id);
  }

  delete(id: number): Observable<Result> {
    return this._Http.delete<Result>(`${this.url}/${id}`);
  }
}
