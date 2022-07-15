import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';
import { AnswerQuestionChange } from '../models/answerQuestionChange';
import { UserChangePassword } from '../models/userChangePassword';
import { UserRecovery } from '../models/userRecovery';

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApipasswordService {
  url = 'https://localhost:7241/password';

  constructor( private _http: HttpClient ) { }

  read(entity: UserRecovery) : Observable<Result>
  {
    return this._http.post<Result>('https://localhost:7241/password/recovery', entity, httpOption);
  }

  change(entity: UserChangePassword) : Observable<Result>
  {
    return this._http.put<Result>('https://localhost:7241/password/change', entity, httpOption);
  }
  
  changeAnswer(entity: AnswerQuestionChange) : Observable<Result>
  {
    return this._http.put<Result>('https://localhost:7241/password/answer', entity, httpOption);
  }

}
