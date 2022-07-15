import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business';
import { Users } from 'src/app/models/users';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { ApiLegalStructureService } from 'src/app/services/apilegalstructure.service';
import { ApiUserService } from 'src/app/services/apiuser.service';

@Component({
  selector: 'app-registerbusiness',
  templateUrl: './registerbusiness.component.html',
  styleUrls: ['./registerbusiness.component.scss']
})
export class RegisterBusinessComponent implements OnInit {
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
  public date: Date;
  public question: string = "";
  public answer: string = "";
  public coin: string = "";
  public acronym: string = "";
  public salt: string = "";

  disableNumber = new FormControl(false);

  listLS: any[] = [];

  constructor(public apiBusiness: ApiBusinessService, public apiUser: ApiUserService, public apiLS: ApiLegalStructureService, public Toastr: ToastrService, private router: Router) {
    apiBusiness.exist().subscribe(x => { if (x.data) { this.router.navigate(['/']); } })
    this.apiLS.read().subscribe(x => { this.listLS = x.data; });
  }

  ngOnInit(): void {
  }

  nameValidation() {
    if (this.name.length <= 5) {
      this.Toastr.warning("El Nombre Debe ser mayor a 5 Caracteres", "MarketAlfaApp");
    }
  }

  phoneValidation() {
    if (this.phone.length <= 8) {
      this.Toastr.warning("El Teléfono Debe ser mayor a 8 dígitos", "MarketAlfaApp");
    }
  }

  directionValidation() {
    if (this.direction.length <= 9) {
      this.Toastr.warning("La Dirección Debe ser mayor a 9 caracteres", "MarketAlfaApp");
    }
  }

  mailValidation() {
    var REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!REGEX.test(this.mail)) {
      this.Toastr.warning("Use un Correo Valido", "MarketAlfaApp");
    }
  }

  coinValidation() {
    if (this.coin.length < 4) {
      this.Toastr.warning("La Moneda Local Debe tener al Menos 4 Caracteres", "MarketAlfaApp");
    }
  }

  acronymValidation() {
    if (this.acronym.length < 1) {
      this.Toastr.warning("El Acronimo de la Moneda Local Debe tener al Menos 1 Caracteres", "MarketAlfaApp");
    }
  }

  rifValidation() {
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    var REGEXSTRING = '[a-Z]';
    if (!this.rif.match(REGEXRIF)) {
      this.Toastr.warning("Use un RIF Valido", "MarketAlfaApp");
    }
  }

  create() {
    var REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    if (!this.rif.match(REGEXRIF)) {
      this.Toastr.warning("Use un RIF Valido", "MarketAlfaApp");
    }
    else {
      if (this.name.length <= 5 || this.phone.length <= 8 || this.direction.length <= 9 || !REGEX.test(this.mail) || this.coin.length < 4 || this.acronym.length < 1) {
        this.nameValidation();
        this.phoneValidation();
        this.directionValidation();
        this.coinValidation();
        this.acronymValidation();
        this.mailValidation();
      }
      else {
        const business: Business = { id: 0, name: this.name, ls: this.ls, rif: this.rif, direction: this.direction, mail: this.mail, phone: this.phone, coin: this.coin, acronym: this.acronym }
        console.log(business);
        this.apiBusiness.create(business).subscribe(result => {
          if (result.success === 1) {
            this.Toastr.success("Empredimiento Registrado", "MarketAlfaApp");
            this.router.navigate(['/']);
          }
        });
      }
    }
  }
}
