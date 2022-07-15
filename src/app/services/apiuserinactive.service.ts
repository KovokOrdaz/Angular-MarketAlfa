import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result, User } from '../models';
import { Users } from '../models/users';


const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiUserInactiveService {
  url = 'https://localhost:7241/userinactive';

  constructor( private _http: HttpClient ) { }

  read() : Observable<Result>
  {
    return this._http.get<Result>(this.url);
  }

  delete(id: number) : Observable<Result>
  {
    return this._http.delete<Result>(`${this.url}/${id}`);
  }
}