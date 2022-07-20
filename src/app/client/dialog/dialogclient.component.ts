import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Client, User } from 'src/app/models';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiClientService } from 'src/app/services/apiclient.service';
import { ApiNationalityService } from 'src/app/services/apinationality.service';

@Component({ templateUrl: 'dialogclient.component.html' })
export class DialogClientComponent {
  user !: User;

  public name: string = "";
  public nationality: number = 0;
  public dni: string = "";
  public status: boolean = true;
  public phone: string = '';
  public direction: string = '';
  public StatusDni: boolean = false;

  public listDni: string[] = [];

  public disableNumber: boolean = false;

  public listNationality: any[] = [];

  constructor(public dialogRef: MatDialogRef<DialogClientComponent>, public apiAuth: ApiAuthService, public api: ApiClientService, public apiNationality: ApiNationalityService, public Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: Client) {
    if (entity !== null) {
      this.name = entity.name;
      this.nationality = entity.nationality;
      if (entity.phone == "S/N") {
        this.disableNumber = true;
      }
      this.phone = entity.phone;
      this.direction = entity.direction;
      this.dni = entity.dni;
      this.status = entity.status;
      this.StatusDni = true;
    }
    this.read();
  }

  dniValidation(): void {
    if (this.entity === null) {
      if (this.dni.length < 7) {
        this.Toastr.warning("Use una Cédula o Pasaporte Valido", "MarketAlfa");
      }
      else {
        if (this.listDni.includes(this.dni)) {
          this.Toastr.warning("Esta Cédula o Pasaporte ya esta Ocupado", "MarketAlfaApp");
        }
      }
    }
    else {
      this.Toastr.info("No se puede Modificar la Cédula o Pasaporte", "MarketAlfaApp");
      this.Toastr.info("Recuerde Seleccionar una Nacionalidad", "MarketAlfaApp");
    }
  }

  nameValidation(): void {
    if (this.name.length < 6) {
      this.Toastr.warning("El Nombre debe contener al menos 6 caracteres", "MarketAlfa");
    }
  }

  directionValidation(): void {
    if (this.direction.length < 10) {
      this.Toastr.warning("El Dirección debe contener al menos 10 caracteres", "MarketAlfa");
    }
  }

  noNumberPhone(): void {
    if (!this.disableNumber) {
      this.phone = "S/N";
      this.Toastr.warning("Teléfono Desactivado", "MarketAlfa");
    }
    else {
      this.phone = "";
      this.Toastr.info("Teléfono Activado", "MarketAlfa");
    }

  }

  read() {
    this.apiNationality.read().subscribe(x => { this.listNationality = x.data; });
    this.api.readDni().subscribe(x => { this.listDni = x.data; });
    this.apiAuth.user.subscribe(x => { this.user = x; });
  }

  phoneValidation() {
    if (this.phone.length < 10) {
      this.Toastr.warning("El Teléfono Debe ser mayor a 10 dígitos", "MarketAlfaApp");
    }
  }

  close() { this.dialogRef.close() }

  create() {
    if (this.dni.length < 7) {
      this.Toastr.warning("Use una Cédula o Pasaporte Valido", "MarketAlfa");
    }
    else {
      if (this.listDni.includes(this.dni)) {
        this.Toastr.warning("Esta Cédula o Pasaporte ya esta Ocupado", "MarketAlfaApp");
      }
      else {
        if (this.name.length < 6) {
          this.Toastr.warning("El nombre debe contener al menos 6 caracteres", "MarketAlfa");
        }
        else {
          if (this.nationality == 0) {
            this.Toastr.warning("Seleccioné Una Nacionalidad", "MarketAlfa");
          }
          else {
            const entity: Client = { name: this.name, nationality: this.nationality, dni: this.dni, status: this.status, userRegister: this.user.id, direction: this.direction, phone: this.phone }
            console.log(entity);
            if (this.disableNumber) {
              if (this.name.length > 5 && this.nationality != 0 && this.dni.length > 5 && this.direction.length > 9) {
                this.api.create(entity).subscribe(result => {
                  if (result.success === 1) {
                    this.dialogRef.close();
                    this.Toastr.success("Cliente Registrado Correctamente", "MarketAlfaApp")
                  }
                  else {
                    this.Toastr.warning("Ha Ocurrido un Error en el registro", "MarketAlfaApp");
                  }
                });
              }
              else {
                this.nameValidation();
                this.dniValidation();
                this.directionValidation();
              }
            }
            else {
              if (this.name.length > 5 && this.nationality != 0 && this.dni.length > 5 && this.direction.length > 9) {
                this.api.create(entity).subscribe(result => {
                  if (result.success === 1) {
                    this.dialogRef.close();
                    this.Toastr.success("Cliente Registrado Correctamente", "MarketAlfaApp")
                  }
                  else {
                    this.Toastr.warning("Ha Ocurrido un Error en el registro", "MarketAlfaApp");
                  }
                });
              }
              else {
                this.nameValidation();
                this.dniValidation();
                this.directionValidation();
              }
            }
          }
        }
      }
    }
  }

  update() {
    if (this.name.length < 6) {
      this.Toastr.warning("El nombre debe contener al menos 6 caracteres", "MarketAlfa");
    }
    else {
      if (this.nationality < 1 || this.nationality == null || this.nationality == 0) {
        this.Toastr.warning("Seleccioné Una Nacionalidad", "MarketAlfa");
      }
      else {
        const entity: Client = { name: this.name, nationality: this.nationality, dni: this.dni, status: this.status, userRegister: this.user.id, direction: this.direction, phone: this.phone }
        console.log(entity);

        if (this.disableNumber) {
          if (this.name.length > 5 && this.nationality != 0 && this.dni.length > 5 && this.direction.length > 9) {
            this.api.update(entity).subscribe(result => {
              if (result.success === 1) {
                this.dialogRef.close();
                this.Toastr.success("Cliente Modificado Correctamente", "MarketAlfaApp");
              }
              else {
                this.Toastr.warning("Ha Ocurrido un error al modificar cliente", "MarketAlfaApp");
              }
            });
          }
          else {
            this.nameValidation();
            this.dniValidation();
            this.directionValidation();
          }
        }
        else {
          if (this.name.length > 5 && this.nationality != 0 && this.dni.length > 5 && this.phone.length > 10 && this.direction.length > 9) {
            this.api.update(entity).subscribe(result => {
              if (result.success === 1) {
                this.dialogRef.close();
                this.Toastr.success("Cliente Modificado Correctamente", "MarketAlfaApp");
              }
              else {
                this.Toastr.warning("Ha Ocurrido un error al modificar cliente", "MarketAlfaApp");
              }
            });
          }
          else {
            this.nameValidation();
            this.dniValidation();
            this.phoneValidation();
            this.directionValidation();
          }
        }

        if (this.name.length > 5 && this.nationality != 0 && this.dni.length > 5) {

        }
        else {
          this.Toastr.warning("Llene Todo Los Campos Correctamente", "MarketAlfaApp");
        }
      }
    }
  }
}
