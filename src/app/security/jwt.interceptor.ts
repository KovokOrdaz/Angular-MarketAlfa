import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthService } from "../services/apiauth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
    constructor(private api: ApiAuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const user = this.api.userData;
        if (user)
        {
            req = req.clone({setHeaders:{Authorization: `Bearer ${user.token}` }})

        }
        return next.handle(req);
    }
}