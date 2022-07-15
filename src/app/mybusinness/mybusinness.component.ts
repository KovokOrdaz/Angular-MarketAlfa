import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Business } from '../models/business';
import { ApiBusinessService } from '../services/apibusiness.service';
import { ApiLegalStructureService } from '../services/apilegalstructure.service';
import { ApiUserService } from '../services/apiuser.service';

@Component({
  selector: 'app-mybusinness',
  templateUrl: './mybusinness.component.html',
  styleUrls: ['./mybusinness.component.scss']
})
export class MyBusinnessComponent implements OnInit {
  public myBusinnes: Business;
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

  listLS:any[] = [];

  constructor(public dialogRef: MatDialogRef<MyBusinnessComponent>, public apiBusiness: ApiBusinessService,public apiUser:ApiUserService, public apiLS: ApiLegalStructureService, public Toastr: ToastrService, private router: Router) 
  {
    this.apiBusiness.read().subscribe(x => 
      { 
        this.myBusinnes = x.data; 
        this.id = this.myBusinnes.id;
        this.name = this.myBusinnes.name;
        this.ls = this.myBusinnes.ls;
        this.direction = this.myBusinnes.direction;
        this.rif = this.myBusinnes.rif;
        this.mail = this.myBusinnes.mail;
        this.phone = this.myBusinnes.phone;
        this.coin = this.myBusinnes.coin;
        this.acronym = this.myBusinnes.acronym;
        console.log(this.myBusinnes);
      });
  }

  ngOnInit(): void 
  {
    this.apiLS.read().subscribe(x => { this.listLS = x.data; });
  }

  close() { this.dialogRef.close() }

  nameValidation()
  {
    if(this.name.length <= 5)
    {
      this.Toastr.warning("El Nombre Debe ser mayor a 5 Caracteres","MarketAlfaApp");
    }
  }

  phoneValidation()
  {
    if(this.phone.length <= 8)
    {
      this.Toastr.warning("El Telefono Debe ser mayor a 8 digitos","MarketAlfaApp");
    }
  }

  directionValidation()
  {
    if(this.direction.length <= 9)
    {
      this.Toastr.warning("La Direccion Debe ser mayor a 9 caracteres","MarketAlfaApp");
    }
  }

  mailValidation()
  { var REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!REGEX.test(this.mail))
    {
      this.Toastr.warning("Use un Correo Valido","MarketAlfaApp");
    }
  }

  coinValidation()
  {
    if(this.coin.length < 4)
    {
      this.Toastr.warning("La Moneda Local Debe tener al Menos 4 Caracteres","MarketAlfaApp");
    }
  }
  
  acronymValidation()
  {
    if(this.acronym.length < 1)
    {
      this.Toastr.warning("El Acronimo de la Moneda Local Debe tener al Menos 1 Caracteres","MarketAlfaApp");
    }
  }

  rifValidation()
  {
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    var REGEXSTRING = '[a-Z]';
    if(!this.rif.match(REGEXRIF))
    { 
      this.Toastr.warning("Use un RIF Valido","MarketAlfaApp");
    }
  }

  update() {
    var REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    var REGEXSTRING = '[a-Z]';
    if(!this.rif.match(REGEXRIF))
    { 
      this.Toastr.warning("Use un RIF Valido","MarketAlfaApp");
    }
    else
    {
      if(this.name.length <= 5 || this.phone.length <= 8 || this.direction.length <= 9 || !REGEX.test(this.mail) || this.coin.length < 4 || this.acronym.length < 1)
      {
        this.nameValidation();
        this.phoneValidation();
        this.directionValidation();
        this.coinValidation();
        this.acronymValidation();
        this.mailValidation();
      }
      else{
      const business:  Business = { id: this.id,  name: this.name, ls:this.ls, rif: this.rif, direction: this.direction, mail: this.mail, phone: this.phone, coin: this.coin, acronym: this.acronym}
      console.log(business);
      this.apiBusiness.update(business).subscribe(result => {
          if (result.success === 1) {
              this.dialogRef.close();
              this.Toastr.success("Empredimiento Modificado","MarketAlfaApp");
              this.router.navigate(['/']);
          }
    });}
    }
  }
}
