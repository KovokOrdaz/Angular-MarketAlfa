import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business';
import { Entry } from 'src/app/models/entry';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-dialogentry',
  templateUrl: './dialogentry.component.html',
  styleUrls: ['./dialogentry.component.scss']
})
export class DialogentryComponent implements OnInit {
  id: number = 0;
  product: string = "";
  amount: number = 0;
  price: number = 0;
  expiration: string = "";

  public list: any[] = [];
  public listProduct: any[] = [];
  public listCode: string[] = [];

  public business: Business;
  public coin: string = "";
  public nameProduct: string = "";

  public measureDec: string = "Medida";

  user !: User;

  constructor(public dialogRef: MatDialogRef<DialogentryComponent>, public api: ApiinventoryService, private router: Router, public apiAuth: ApiAuthService, public apiBusiness: ApiBusinessService, public apiProduct: ApiProductService, public Toastr: ToastrService) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin = x.data.acronym });
  }

  ngOnInit(): void {
    this.read();
  }

  filterStates(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.listProduct.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
      //return this.listDist.filter(state => state.name .toLowerCase().startsWith(filterValue));
    }

    return this.listProduct;
  }

  amountValidation(): void {
    if (!(this.amount > 0)) {
      this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
    }
  }

  priceValidation(): void {
    if (!(this.price > 0)) {
      this.Toastr.warning("El Precio debe ser mayor a 0", "MarketAlfaApp");
    }
  }

  read() {
    this.apiProduct.read().subscribe(x => { this.listProduct = x.data; });
    this.apiProduct.readCode().subscribe(x => { this.listCode = x.data; });
  }

  resetListProduct(): void {
    this.apiProduct.read().subscribe(x => { this.listProduct = x.data; console.log(this.listProduct) });
    this.apiProduct.readCode().subscribe(x => { this.listCode = x.data; console.log(this.listCode) });
  }

  public codeMeasure(): void {
    console.log(this.product)
    if (this.listCode.includes(this.product)) {
      this.apiProduct.read().subscribe(x => {
        this.listProduct = x.data;
        var productName = this.listProduct.find(item => item.code == this.product);
        this.measureDec = productName.description;
        this.nameProduct = productName.name;
      });
    }
    else {
      this.nameProduct = "";
    }
    this.resetListProduct();
  }

  close() { this.dialogRef.close() }

  create() {
    if (this.listCode.includes(this.product)) {
      var productName = this.listProduct.find(item => item.code == this.product);
      if (this.price > 0) {
        if (this.amount > 0) {
          if (Date.parse(this.expiration) > Date.now()) {
            if (productName.complete) {
              if (Number.isInteger(this.amount)) {
                const entity: Entry = { id: this.id, product: this.product, amount: this.amount, price: this.price, registeredBy: this.user.id, expiration: this.expiration }
                console.log(entity);
                this.api.create(entity).subscribe(result => {
                  if (result.success === 1) {
                    this.dialogRef.close();
                    this.Toastr.success("Registro Correcto", "MarketAlfaApp");
                    this.router.navigate(['/inventary']);
                  }
                });
              }
              else {
                this.Toastr.warning("Este Producto Se Vende Entero", "MarketAlfaApp");
              }
            }
            else {
              const entity: Entry = { id: this.id, product: this.product, amount: this.amount, price: this.price, registeredBy: this.user.id, expiration: this.expiration }
              console.log(entity);
              this.api.create(entity).subscribe(result => {
                if (result.success === 1) {
                  this.dialogRef.close();
                  this.Toastr.success("Registro Correcto", "MarketAlfaApp");
                  this.router.navigate(['/inventary']);
                }
              });
            }
          }
          else {
            this.Toastr.warning("La Fecha de Expiración no puede ser Inferior a la Fecha de Actual", "MarketAlfaApp");
          }
        }
        else {
          this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("El Precio debe ser mayor a 0", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("El Código de este Producto no es Valido", "MarketAlfaApp");
    }
  }
}
