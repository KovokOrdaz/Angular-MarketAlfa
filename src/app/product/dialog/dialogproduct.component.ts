import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Product } from 'src/app/models/product';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { ApiMeasureService } from 'src/app/services/apimeasure.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({ templateUrl: 'dialogproduct.component.html' })
export class DialogProductComponent {
  public id: number = 0;
  public code: string = "";
  public name: string = "";
  public category: number = 0;
  public description: number = 0;
  public status: boolean = true;
  public statusCode: boolean = false;

  public listCategory: any[] = [];
  public listMeasure: any[] = [];
  public listCode: string[] = [];
  public listName: string[] = [];

  user !: User;

  constructor(public dialogRef: MatDialogRef<DialogProductComponent>, public api: ApiProductService, private router: Router, public apiAuth: ApiAuthService, public apiCategory: ApiCategoryService, public apiMeasure: ApiMeasureService, public Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: Product) {
    this.apiAuth.user.subscribe(x => { this.user = x; });
    if (entity !== null) {
      this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
      this.code = entity.code;
      this.name = entity.name;
      this.category = entity.category;
      this.description = entity.description;
      this.status = entity.status;
      this.statusCode = true;
    }
    this.read();
  }

  codeValidation(): void {
    if (this.entity === null) {
      if (this.code.length < 6) {
        this.Toastr.warning("El Código debe tener a Menor a 6 Caracteres", "MarketAlfaApp");
      }
      else {
        if (this.listCode.includes(this.code)) {
          this.Toastr.warning("Este Código ya esta Ocupado", "MarketAlfaApp");
        }
      }
    }
    else {
      this.Toastr.info("No se puede Modificar el Código", "MarketAlfaApp");
      this.Toastr.info("Recuerde Seleccionar una Medida", "MarketAlfaApp");
      this.Toastr.info("Recuerde Seleccionar una Categoría", "MarketAlfaApp");
    }
  }

  nameValidation(): void {
    if (this.name.length < 3) {
      this.Toastr.warning("El Nombre debe tener a Menor a 3 Caracteres", "MarketAlfaApp");
    }
    else {
      if (this.entity === null) {
        if (this.listName.includes(this.name)) {
          this.Toastr.warning("Este Producto ya esta Registrado", "MarketAlfaApp");
        }
      }
    }
  }

  read() {
    this.apiCategory.readActive().subscribe(x => { this.listCategory = x.data; });
    this.apiMeasure.readActive().subscribe(x => { this.listMeasure = x.data; });
    this.api.readCode().subscribe(x => { this.listCode = x.data; console.log(this.listCode) });
    this.api.readName().subscribe(x => { this.listName = x.data; console.log(this.listName) });
  }

  close() { this.dialogRef.close() }

  create() {
    if (this.listCode.includes(this.code)) {
      this.Toastr.warning("Este Código ya esta Registrado", "MarketAlfaApp");
    }
    else {
      if (this.listName.includes(this.name)) {
        this.Toastr.warning("Este Producto ya esta Registrado", "MarketAlfaApp");
      }
      else {
        if (this.code.length > 5 && this.name.length > 3 && this.category != 0 && this.description != 0) {
          const product: Product = { code: this.code, name: this.name, category: this.category, description: this.description, status: this.status, registeredBy: this.user.id }
          console.log(product);
          this.api.create(product).subscribe(result => {
            if (result.success === 1) {
              this.dialogRef.close();
              this.Toastr.success("Registro Correcto", "MarketAlfaApp");
            }
          });
        }
        else {
          this.Toastr.warning("Llene Correctamente Los Campos", "MarketAlfaApp");
          if (this.category == 0 || this.category == null) {
            this.Toastr.warning("Seleccione una Categoría", "MarketAlfaApp");
          }
          if (this.description == 0 || this.description == null) {
            this.Toastr.warning("Seleccione una Medida", "MarketAlfaApp");
          }

          if (this.code.length < 6) {
            this.Toastr.warning("El Nombre debe tener a Menor a 3 Caracteres", "MarketAlfaApp");
          }

          if (this.name.length > 2) {
            this.Toastr.warning("El Nombre debe tener a Menor a 3 Caracteres", "MarketAlfaApp");
          }
        }
      }
    }
  }

  update() {
    if (this.code.length >= 3 && this.name.length >= 3 && this.category != 0 && this.description != 0) {
      const product: Product = { code: this.code, name: this.name, category: this.category, description: this.description, status: true, registeredBy: this.user.id }
      console.log(product);
      this.api.update(product).subscribe(result => {
        if (result.success === 1) {
          this.dialogRef.close();
          this.Toastr.success("Registro Correcto", "MarketAlfaApp");
        }
        else {
          this.Toastr.warning("Registro Fallido", "MarketAlfaApp");
        }
      });
    }
    else {
      if (this.code.length < 3) {
        this.Toastr.warning("El Código del Producto de debe tener al menos 3 caracteres", "MarketAlfaApp");
      }
      if (this.name.length < 3) {
        this.Toastr.warning("El Nombre del Producto de debe tener al menos 3 caracteres", "MarketAlfaApp");
      }
      if (this.category < 1) {
        this.Toastr.warning("Seleccioné Una Categoría", "MarketAlfaApp");
      }
      if (this.description < 1) {
        this.Toastr.warning("Seleccioné Una Medida", "MarketAlfaApp");
      }
      this.Toastr.warning("Llene Correctamente Los Campos", "MarketAlfaApp");
    }
  }
}
