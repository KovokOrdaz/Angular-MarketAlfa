import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { ApiAuthService } from "../services/apiauth.service";

@Injectable ({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
    constructor(private router: Router, private api: ApiAuthService)
    {

    }

    canActivate(route: ActivatedRouteSnapshot)
    {
        const user: User = this.api.userData;
        if(user)
        {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}