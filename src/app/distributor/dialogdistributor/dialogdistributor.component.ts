import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Distributor } from 'src/app/models/distributor';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';
import { ApiLegalStructureService } from 'src/app/services/apilegalstructure.service';

@Component({
  selector: 'app-dialogdistributor',
  templateUrl: './dialogdistributor.component.html'
})
export class DialogDistributorComponent {
  disableNumber = new FormControl(false);
  public id: number = 0;
  public name: string = "";
  public ls: number = 0;
  public rif: string = "";
  public registeredBy: number = 0;
  public status: boolean = true;
  public statusRif: boolean = false;
  user !: User;
  public listLS: any[] = [];
  public listRif: string[] = [];
  public listName: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogDistributorComponent>, private router: Router, public apiAuth: ApiAuthService, public api: ApiDistributorService, public apiLS: ApiLegalStructureService, public Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: Distributor) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
    if (entity !== null) {
      this.id = entity.id;
      this.ls = entity.ls;
      this.name = entity.name;
      this.rif = entity.rif;
      this.status = entity.status;
      this.statusRif = true;
      this.registeredBy = entity.registeredBy;
    }
    this.read();
  }

  read() {
    this.apiLS.read().subscribe(x => { this.listLS = x.data; });
    this.api.readName().subscribe(x => { this.listName = x.data; });
    this.api.readRif().subscribe(x => { this.listRif = x.data; });
  }

  nameValidation(): void {
    if (this.entity === null) {
      if (this.name.length < 6) {
        this.Toastr.warning("El Nombre debe tener al menos 6 Caracteres", "MarketAlfaApp");
      }
      else {
        if (this.listName.includes(this.name)) {
          this.Toastr.warning("Este Nombre Ya esta Registrado", "MarketAlfaApp");
        }
      }
    }
  }

  rifValidation(): void {
    if (this.entity === null) {
      var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
      if (!this.rif.match(REGEXRIF)) {
        this.Toastr.warning("Use un RIF Valido, EJEMPLO: J-12345678-9", "MarketAlfaApp");
      }
      else {
        if (this.listRif.includes(this.rif)) {
          this.Toastr.warning("Este Rif Ya esta Registrado", "MarketAlfaApp");
        }
      }
    }
  }

  close() { this.dialogRef.close() }

  create() {
    const entity: Distributor = { id: this.id, registeredBy: this.user.id, name: this.name, ls: this.ls, rif: this.rif, status: this.status }
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    if (this.rif.match(REGEXRIF)) {
      if (this.name.length > 5 && this.ls != 0 && !this.listRif.includes(this.rif) && !this.listName.includes(this.name)) {
        console.log(entity);
        this.api.create(entity).subscribe(result => {
          if (result.success === 1) {
            this.dialogRef.close();
            this.Toastr.success("Distribuidor Registrado Correctamente", "MarketAlfaApp")
          }
          else {
            this.Toastr.warning("Llene Todo Los Campos", "MarketAlfaApp");
          }
        });
      }
      else {
        if (this.ls == 0) {
          this.Toastr.warning("Selecione Una Estructura Legal", "MarketAlfaApp");
        }

        if (this.name.length < 6) {
          this.Toastr.warning("El Nombre debe tener al menos 6 Caracteres", "MarketAlfaApp");
        }

        if (this.listRif.includes(this.rif)) {
          this.Toastr.warning("Este Rif Ya esta Registrado", "MarketAlfaApp");
        }
        if (this.listName.includes(this.name)) {
          this.Toastr.warning("Este Nombre Ya esta Registrado", "MarketAlfaApp");
        }
      }
    }
    else {
      this.Toastr.warning("Use un RIF Valido, EJEMPLO: J-12345678-9", "MarketAlfaApp");
    }
  }

  update() {
    const entity: Distributor = { id: this.id, name: this.name, registeredBy: 0, ls: this.ls, rif: this.rif, status: this.status }
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    if (this.rif.match(REGEXRIF)) {
      if (this.name.length > 5 && this.ls != 0) {
        console.log(entity);
        this.api.update(entity).subscribe(result => {
          if (result.success === 1) {
            this.dialogRef.close();
            this.Toastr.success("Distribuidor Modificado Correctamente", "MarketAlfaApp")
          }
          else {
            this.Toastr.warning("Llene Todo Los Campos", "MarketAlfaApp");
          }
        });
      }
      else {
        this.Toastr.warning("El Nombre debe tener al menos 6 Caracteres", "MarketAlfaApp");
        this.Toastr.warning("Seleccione Una Estructura Legal", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("Use un RIF Valido, EJEMPLO: J-12345678-9", "MarketAlfaApp");
    }
  }
}
