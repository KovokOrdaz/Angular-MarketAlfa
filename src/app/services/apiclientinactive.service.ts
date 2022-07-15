import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Client } from '../models/client';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiClientInactiveService {

  url = 'https://localhost:7241/clientinactive';

  constructor( private _http: HttpClient ) { }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url);
  }

  create(entity: Client) : Observable<Result>
  {
    return this._http.post<Result>(this.url, entity, httpOption);
  }

  update(entity:Client) : Observable<Result>
  {
    return this._http.put<Result>(this.url, entity, httpOption);
  }
  
  delete(id: string) : Observable<Result>
  {
    return this._http.delete<Result>(`${this.url}/${id}`);
  }
}
