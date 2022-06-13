import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { Subject } from "rxjs";

@Component({ 
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit
{
    private viewLogin: boolean = true;
    viewRecovery = new Subject<boolean>();
    private viewRegister: boolean = false;

    public setViewLogin(): boolean
    {
        return this.viewLogin;
    }
    public getViewRecovery(): void
    {
        this.viewRecovery.next(true);
    }
    public setViewRegister(): boolean
    {
        return this.viewRegister;
    }

    public loginForm = this.formBuilder.group(
        {
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    constructor(public api: ApiAuthService, private router: Router, public formBuilder: FormBuilder)
    {
        // if(this.api.userData)
        // {
        //     this.router.navigate(['/']);
        // }
    }
    
    ngOnInit(){}

    login()
    {
        this.api.login(this.loginForm.value).subscribe(x=> 
            {
                if(x.success === 1)
                {
                    this.router.navigate(['/home']);
                }
            });
    }
}