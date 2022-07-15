import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';
import { BuyVM } from '../models/buyVM';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApibuyService {

  url: string = "https://localhost:7241/buy";
  constructor(private _Http: HttpClient) { }

  read(): Observable<Result> {
    return this._Http.get<Result>(this.url);
  }

  readUser(ID: number): Observable<Result> {
    return this._Http.get<Result>(this.url + "/" + ID);
  }

  selectProduct(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/product");
  }

  ProductMax(id: number): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/max/" + id);
  }

  select(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/select");
  }

  entry(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventory/entry");
  }

  detail(ID: number): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/concept/" + ID);
  }

  price(ID: number): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/price/" + ID);
  }

  reportBuy(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportbuy");
  }

  reportProduct(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportproduct");
  }

  reportMeasure(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportmeasure");
  }

  reportCategory(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportcategory");
  }

  reportMeasureDay(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportmeasureday");
  }

  reportMeasureWeek(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportmeasureweek");
  }

  reportMeasureMounth(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportmeasuremonth");
  }

  reportCategoryDay(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportcategoryday");
  }

  reportCategoryWeek(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportcategoryweek");
  }

  reportCategoryMounth(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportcategorymonth");
  }

  reportProductDay(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportproductday");
  }

  reportProductWeek(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportproductweek");
  }

  reportProductMounth(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/buy/reportproductmonth");
  }

  create(entity: BuyVM): Observable<Result> {
    return this._Http.post<Result>(this.url, entity, httpOption);
  }
}
