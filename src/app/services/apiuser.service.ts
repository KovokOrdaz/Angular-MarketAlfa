import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result, User } from '../models';
import { InactiveElement } from '../models/inactiveElement';
import { Users } from '../models/users';


const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  url = 'https://localhost:7241/user';

  constructor(private _http: HttpClient) { }

  read(): Observable<Result> {
    return this._http.get<Result>(this.url);
  }

  readFull(): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/user/fulluser");
  }

  readSuper(): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/user/superuser");
  }

  readPseudomyn(): Observable<Result> {
    return this._http.get<Result>("https://localhost:7241/user/pseudonym");
  }

  exist(): Observable<Result> {
    return this._http.get<Result>('https://localhost:7241/user/exist');
  }

  create(entity: Users): Observable<Result> {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  delete(entity: InactiveElement): Observable<Result> {
    return this._http.put<Result>(this.url, entity, httpOption);
  }

  // delete(id: number): Observable<Result> {
  //   return this._http.delete<Result>(`${this.url}/${id}`);
  // }
}
