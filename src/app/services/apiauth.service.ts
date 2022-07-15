import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Login } from "../models/login";
import { Result } from "../models/result";
import { User } from "../models/user";

const httpOption = {headers: new HttpHeaders({'Contend-Type': 'application/json' }) };

@Injectable ({providedIn: 'root'})
export class ApiAuthService
{
    url: string = 'https://localhost:7241/login';

    private userSubject: BehaviorSubject<User>;

    public user: Observable<User>;

    public get userData(): User
    {
        return this.userSubject.value;
    }
    
    constructor(private _http: HttpClient)
    {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    login(xlogin: Login): Observable<Result>
    {
        console.log("Hola 2");
        return this._http.post<Result>(this.url, xlogin, httpOption).pipe(map(x => 
            {
                if(x.success === 1)
                {
                    const user: User = x.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                else
                {
                    console.log(x);
                }
                return x;
            }));
    }

    logout()
    {
        localStorage.removeItem('user');

        this.userSubject.next(null!);
    }
}