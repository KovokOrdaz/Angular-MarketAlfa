import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Product } from '../models/product';
import { InactiveElement } from '../models/inactiveElement';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  url = 'https://localhost:7241/product';

  constructor(private _http: HttpClient) { }

  read(): Observable<Result> {
    return this._http.get<Result>(this.url);
  }

  create(entity: Product): Observable<Result> {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Product): Observable<Result> {
    return this._http.put<Result>(this.url, entity, httpOption);
  }

  // delete(id: string) : Observable<Result>
  // {
  //   return this._http.delete<Result>(`${this.url}/${id}`);
  // }

  delete(entity: InactiveElement): Observable<Result> {
    return this._http.put<Result>("https://localhost:7241/product/delete", entity, httpOption);
  }

  isComplete(id: string): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/product/iscomplete/" + id);
  }

  readCode(): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/product/code");
  }

  readName(): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/product/name");
  }

  getName(id: string): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/product/name/" + id);
  }

  getMeasure(id: string): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/product/measure/" + id);
  }
}
