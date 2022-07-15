import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';
import { Alert } from '../models/alert';
import { Entry } from '../models/entry';
import { Price } from '../models/price';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiinventoryService {
  url: string = "https://localhost:7241/inventory";
  constructor(private _Http: HttpClient) { }

  read(): Observable<Result> {
    return this._Http.get<Result>(this.url);
  }

  readCategory(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/inventorycategory");
  }

  readMeasure(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/inventorymeasure");
  }

  select(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/select");
  }

  low(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/low");
  }

  entry(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/entry");
  }

  create(entity: Entry): Observable<Result> {
    return this._Http.post<Result>(this.url, entity, httpOption);
  }

  changeAlert(entity: Alert): Observable<Result> {
    return this._Http.post<Result>("https://localhost:7241/inventory/alert", entity, httpOption);
  }

  changePrice(entity: Price): Observable<Result> {
    return this._Http.post<Result>("https://localhost:7241/inventory/price", entity, httpOption);
  }

}
