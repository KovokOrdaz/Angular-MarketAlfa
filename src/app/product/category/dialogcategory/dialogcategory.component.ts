import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { ApiMeasureService } from 'src/app/services/apimeasure.service';

@Component({
  selector: 'app-dialogcategory',
  templateUrl: './dialogcategory.component.html',
  styleUrls: ['./dialogcategory.component.scss']
})
export class DialogCategoryComponent {

  public id: number = 0;
  public name: string = "";
  public status: boolean = true;


  public listCategory: any[] = [];
  public listMeasure: any[] = [];
  public listName: string[] = [];

  constructor(public dialogRef: MatDialogRef<DialogCategoryComponent>, public api: ApiCategoryService, public apiCategory: ApiCategoryService, public apiMeasure: ApiMeasureService, public snackBar: MatSnackBar, private Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: Category) {
    if (entity !== null) {
      this.id = entity.id;
      this.name = entity.name;
      this.status = entity.status;
    }
    this.read();
  }
  nameValidation(): void {
    if (this.entity === null) {
      if (this.name.length > 4) {
        if (this.listName.includes(this.name.toUpperCase())) {
          this.Toastr.warning("Esta Categoría ya Existe", "MarketAlfaApp");
        }

      }
      else {
        this.Toastr.warning("Los Nombre de la Categorías debe tener al menos 5 caracteres", "MarketAlfaApp");
      }
    }
  }
  read() {
    this.apiCategory.readName().subscribe(x => { this.listName = x.data; });
    this.apiCategory.read().subscribe(x => { this.listCategory = x.data; });
    this.apiMeasure.read().subscribe(x => { this.listMeasure = x.data; });
  }

  close() { this.dialogRef.close() }

  capitalizar(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  create() {
    if (this.listName.includes(this.capitalizar(this.name))) {
      this.Toastr.warning("Esta Categoría ya Existe", "MarketAlfaApp");
    }
    else {
      if (this.name.length > 4) {
        const entity: Category = { id: this.id, name: this.name, status: this.status }
        console.log(entity);
        this.api.create(entity).subscribe(result => {
          if (result.success === 1) {
            this.dialogRef.close();
            this.Toastr.success("Registro de Categoría Exitoso", "MarketAlfaApp");
          }
        });
      }
      else {
        this.Toastr.warning("Los Nombre de la Categorías debe tener al menos 5 caracteres", "MarketAlfaApp");
      }
    }
  }

  update() {
    const entity: Category = { id: this.id, name: this.name, status: this.status }
    console.log(entity);
    if (this.name.length > 4) {
      this.api.update(entity).subscribe(result => {
        if (result.success === 1) {
          this.dialogRef.close();
          this.Toastr.success("Modificación de Categoría Exitosa", "MarketAlfaApp");
        }
      });
    }
    else {
      this.Toastr.warning("Los Nombre de la Categorías debe tener al menos 5 caracteres", "MarketAlfaApp");
    }
  }
}
