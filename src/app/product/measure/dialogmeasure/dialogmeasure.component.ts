import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Measure } from 'src/app/models/measure';
import { Product } from 'src/app/models/product';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { ApiMeasureService } from 'src/app/services/apimeasure.service';

@Component({
  selector: 'app-dialogmeasure',
  templateUrl: './dialogmeasure.component.html'
})
export class DialogMeasureComponent {
  public id: number = 0;
  public name: string = "";
  public acronym: string = "";
  public status: boolean = true;
  public complete: boolean = true;

  public listName: string[] = [];
  public listAcro: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogMeasureComponent>, public api: ApiMeasureService, public snackBar: MatSnackBar, private Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: Measure) {
    if (entity !== null) {
      this.id = entity.id;
      this.name = entity.name;
      this.acronym = entity.acronym;
      this.status = entity.status;
      this.complete = entity.complete;
    }
    this.read();
  }

  capitalizar(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  read() {
    this.api.readName().subscribe(x => { this.listName = x.data; console.log(this.listName) });
    this.api.readAcro().subscribe(x => { this.listAcro = x.data; console.log(this.listAcro) });
  }

  nameValidation(): void {
    if (this.entity === null) {
      if (this.name.length >= 4) {
        if (this.listName.includes(this.capitalizar(this.name))) {
          this.Toastr.warning("Medida Ya Registrada", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("Los Nombre de las Medidas debe tener al menos 4 caracteres", "MarketAlfaApp");
      }

    }
  }

  acroValidation(): void {
    if (this.entity === null) {
      if (this.acronym.length > 1) {
        if (this.listAcro.includes(this.capitalizar(this.acronym))) {
          this.Toastr.warning("Acrónimo Ya Registrada", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("Los Nombre de los Acrónimo debe tener al menos 2 caracteres", "MarketAlfaApp");
      }

    }
  }

  close() { this.dialogRef.close() }

  create() {
    if (this.name.length > 3) {
      if (this.listName.includes(this.capitalizar(this.name))) {
        this.Toastr.warning("Medida Ya Registrada", "MarketAlfaApp");
      }
      else {
        if (this.acronym.length > 1) {
          if (this.listAcro.includes(this.capitalizar(this.acronym))) {
            this.Toastr.warning("Acrónimo Ya Registrada", "MarketAlfaApp");
          }
          else {
            const entity: Measure = { id: this.id, name: this.name, acronym: this.acronym, status: this.status, complete: this.complete }
            console.log(entity);
            this.api.create(entity).subscribe(result => {
              if (result.success === 1) {
                this.dialogRef.close();
                this.Toastr.success("Registro Completo", "MarketAlfaApp");
              }
            });
          }
        }
        else {
          this.Toastr.warning("Los Nombre de los Acrónimo debe tener al menos 2 caracteres", "MarketAlfaApp");
        }
      }
    }
    else {
      this.Toastr.warning("Los Nombre de las Medidas debe tener al menos 4 caracteres", "MarketAlfaApp");
    }
  }

  update() {
    if (this.name.length > 3) {
      if (this.acronym.length > 1) {
        const entity: Measure = { id: this.id, name: this.name, acronym: this.acronym, status: this.status, complete: this.complete }
        console.log(entity);
        this.api.update(entity).subscribe(result => {
          if (result.success === 1) {
            this.dialogRef.close();
            this.Toastr.success("Medida Modificada Correctamente", "MarketAlfaApp");
          }
        });
      }
      else {
        this.Toastr.warning("Los Nombre de los Acrónimo debe tener al menos 2 caracteres", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("Los Nombre de las Medidas debe tener al menos 4 caracteres", "MarketAlfaApp");
    }
  }

}

