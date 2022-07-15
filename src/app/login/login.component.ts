import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { Subject } from "rxjs";
import { ApiUserService } from "../services/apiuser.service";
import { ApiBusinessService } from "../services/apibusiness.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    user: boolean;
    business: boolean;
    viewLogin: boolean = true;
    viewRegisterUser: boolean = false;
    viewRegisterBusiness: boolean = false;
    viewRecovery = new Subject<boolean>();

    public getViewRecovery(): void {
        this.viewRecovery.next(true);
    }

    public loginForm = this.formBuilder.group(
        {
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    constructor(public api: ApiAuthService, public apiUser: ApiUserService, public apiBusiness: ApiBusinessService, private router: Router, public formBuilder: FormBuilder, private Toastr: ToastrService) {
        apiBusiness.exist().subscribe(x => { if (!x.data) { this.router.navigate(['/registermybusiness']); } })
        apiUser.exist().subscribe(x => { if (!x.data) { this.router.navigate(['/registeruser']); } })
        if (this.api.userData) {
            this.router.navigate(['/buy']);
        }
    }

    ngOnInit() {
    }

    login() {
        this.api.login(this.loginForm.value).subscribe(x => {
            console.log(this.loginForm.value);
            if (x.success === 1) {
                if (x.data.privilige) {
                    this.router.navigate(['/home']);
                }
                else {
                    this.router.navigate(['/buy']);
                }
            }
            else {
                this.Toastr.error('Usuario o Contraseña Incorrectos', 'MarketAlfaApp');
            }
        });
    }
}