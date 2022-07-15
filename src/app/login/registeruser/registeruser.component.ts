import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { ApiUserService } from 'src/app/services/apiuser.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {
  public id: number = 0;
  public name: string = "";
  public ls: number = 0;
  public rif: string = "";
  public phone: string = "";
  public direction: string = "";
  public status: boolean = true;
  public nameUser: string;
  public pseudonym: string;
  public mail: string = "";
  public password: string = "";
  public privilege: boolean = true;
  public question: string = "";
  public answer: string = "";
  public coin: string = "";
  public acronym: string = "";
  public salt: string = "";

  disableNumber = new FormControl(false);

  listLS:any[] = [];

  constructor(public apiUser:ApiUserService, public snackBar: MatSnackBar, private router: Router, private Toastr: ToastrService)
  {
    apiUser.exist().subscribe(x => { if(x.data){this.router.navigate(['/']);}})
  }

  ngOnInit(): void {
  }

  create() {
    const user: Users = { id: this.id, name: this.name, pseudomyn: this.pseudonym, password: this.password, privilege: true,  status: true, salt: this.salt, question: this.question, answer: this.answer}
    var REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (this.password.match(REGEX))
    {
      if( this.name.length > 3, this.pseudonym.length > 3, this.password.length > 3, this.question.length > 3,this.answer.length > 3)
      {
        this.apiUser.create(user).subscribe(result => {
          if (result.success === 1) {
            this.Toastr.success("Usuario Registrado Satisfatoriamente","MarketAlfaApp");
            this.router.navigate(['/']);
          }
    });
      }
      else
      {
        this.Toastr.warning("Todos Los Campos Deben Estar Completo","MarketAlfaApp");
      }
  }
  else
  {
    this.Toastr.info("La Contraseña debe tener al Menos 8 caracteres, 1 Mayuscula, 1 Minuscula y 1 Especial (Sin Espacios)","MarketAlfaApp");
  }
}
}