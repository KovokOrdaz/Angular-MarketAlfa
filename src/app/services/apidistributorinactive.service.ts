import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Distributor } from '../models/distributor';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
export class ApiDistributorInactiveService {

  url = 'https://localhost:7241/distributorinactive';

  constructor(private _http: HttpClient) { }

  read(): Observable<Result> {
    return this._http.get<Result>(this.url);
  }

  create(entity: Distributor): Observable<Result> {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity: Distributor): Observable<Result> {
    return this._http.put<Result>(this.url, entity, httpOption);
  }

  delete(id: number): Observable<Result> {
    return this._http.delete<Result>(`${this.url}/${id}`);
  }
}
