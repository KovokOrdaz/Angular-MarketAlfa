import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Distributor } from '../models/distributor';
import { InactiveElement } from '../models/inactiveElement';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiDistributorService {

  url = 'https://localhost:7241/distributor';

  constructor(private _http: HttpClient) { }

  read(): Observable<Result> {
    return this._http.get<Result>(this.url);
  }

  readName(): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/name');
  }

  readRif(): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/rif');
  }

  speed(): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/speed');
  }

  respet(): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/respet');
  }

  speedProduct(id: string): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/speed/' + id);
  }

  respetProduct(id: string): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/distributor/respet/' + id);
  }

  ultimate() {
    return this._http.get<Result>('https://localhost:7241/distributor/ultimate');
  }

  common() {
    return this._http.get<Result>('https://localhost:7241/distributor/common');
  }

  create(entity: Distributor): Observable<Result> {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Distributor): Observable<Result> {
    return this._http.put<Result>(this.url, entity, httpOption);
  }

  delete(entity: InactiveElement): Observable<Result> {
    return this._http.put<Result>('https://localhost:7241/distributor/delete', entity, httpOption);
  }

  // delete(id: string): Observable<Result> {
  //   return this._http.delete<Result>(`${this.url}/${id}`);
  // }
}
