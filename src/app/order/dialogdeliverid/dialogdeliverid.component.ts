import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product, User } from 'src/app/models';
import { ConceptRequest } from 'src/app/models/conceptResquest';
import { OrderX } from 'src/app/models/orderX';
import { RequestVM } from 'src/app/models/requestVM';
import { ApiProductService } from 'src/app/services/apiproduct.service';
import { ApiresquestService } from 'src/app/services/apiresquest.service';
import { map, startWith } from 'rxjs/operators';
import { Business } from 'src/app/models/business';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/apiauth.service';

@Component({
  selector: 'app-dialogdeliverid',
  templateUrl: './dialogdeliverid.component.html',
  styleUrls: ['./dialogdeliverid.component.scss']
})
export class DialogdeliveridComponent implements OnInit {

  public business: Business;
  public listProduct: any[] = [];
  public listCode: string[] = [];
  public listCodeProduct: string[] = [];
  public complete: boolean = false;
  public coin: string = "";
  public priceTotal: number = 0;
  public request: RequestVM;
  public concept: ConceptRequest[];
  filteredOptions: Observable<Product[]>;
  user !: User;
  public nameProduct: string = "";
  public productOrder: any[] = [];

  public measureDec: string = "Medida";
  public formConcept = this.formBuilder.group
    ({
      product: [null],
      amount: [1],
      price: [1],
      expiration: [null]
    });

  constructor(public dialogRef: MatDialogRef<DialogdeliveridComponent>, public apiAuth: ApiAuthService, private router: Router, public formBuilder: FormBuilder, public api: ApiresquestService, public apiProduct: ApiProductService, public Toastr: ToastrService, public apiBusiness: ApiBusinessService, @Inject(MAT_DIALOG_DATA) public entity: OrderX) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin = x.data.acronym });
    this.concept = [];
    this.request = { distributor: entity.idDistributor, orderD: entity.id, code: '', user: this.user.id, products: [] };
    console.log(this.request);
    this.api.selectProduct(entity.id).subscribe(x => {
      console.log(x.data);
      this.productOrder = x.data;
      for (var i = 0; i < this.productOrder.length; i++) {
        var _product = this.productOrder[i];
        var productTemp: ConceptRequest = { product: _product.product, amount: _product.amount, price: _product.price, expiration: _product.date };
        console.log(productTemp);
        this.concept.push(productTemp);
        this.getTotal();
      }
    }
    );
  }

  ngOnInit(): void {
    this.read();
    this.filteredOptions = this.formConcept.get('product').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.listProduct.slice())),
    );
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.listProduct.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
  }

  codeMeasure(): void {
    if (this.listCodeProduct.includes(this.formConcept.get('product').value)) {
      var productName = this.listProduct.find(item => item.code == this.formConcept.get('product').value);
      this.measureDec = productName.description;
      this.nameProduct = productName.name;
    }
    else {
      this.nameProduct = "";
    }
  }

  codeValidation(): void {
    if (this.listCode.includes(this.request.code)) {
      this.Toastr.warning("Esta Factura ya esta Registrada", "MarketAlfaApp");
    }
  }

  amountValidation(): void {
    if (!(this.formConcept.get('amount').value > 0)) {
      this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
    }
  }

  priceValidation(): void {
    if (!(this.formConcept.get('price').value > 0)) {
      this.Toastr.warning("El Precio debe ser mayor a 0", "MarketAlfaApp");
    }
  }

  dateValidation(): void {
    if (!(Date.parse(this.formConcept.get('expiration').value))) {
      this.Toastr.warning("Use Una Fecha valida", "MarketAlfaApp");
    }
    else {
      if (Date.parse(this.formConcept.get('expiration').value) < Date.now()) {
        this.Toastr.warning("La Fecha de Expiración no debe ser menor a la Fecha Actual", "MarketAlfaApp");
      }
    }
  }

  public getName(code: string): string {
    var productName = this.listProduct.find(item => item.code == code);
    return productName?.name;
  }

  getMeasure(code: string) {
    var productName = this.listProduct.find(item => item.code == code);
    return productName?.acronym;
  }

  getTotal(): void {
    var total: number = 0;
    this.concept.forEach(function (value) { total = total + (value.amount * value.price); console.log(total) });
    this.priceTotal = total;
  }

  deleteConcept(product: string) {
    var newConcept = this.concept.filter((item) => item.product !== product);
    this.concept = newConcept;
    this.getTotal();
  }

  editConcept(product: string) {
    var newConcept = this.concept.filter((item) => item.product !== product);
    var editConcept = this.concept.find(item => item.product == product);
    this.formConcept.controls['amount'].setValue(editConcept.amount);
    this.formConcept.controls['product'].setValue(editConcept.product);
    this.formConcept.controls['price'].setValue(editConcept.price);
    this.formConcept.controls['expiration'].setValue(editConcept.expiration);
    this.concept = newConcept;
    this.getTotal();
  }

  read() {
    this.apiProduct.read().subscribe(x => { this.listProduct = x.data; });
    this.api.readCode().subscribe(x => { this.listCode = x.data; });
    this.apiProduct.readCode().subscribe(x => { this.listCodeProduct = x.data; });
  }

  close() { this.dialogRef.close() }

  addContent() {
    if (this.listCodeProduct.includes(this.formConcept.get('product').value)) {
      if (this.formConcept.get('price').value > 0) {
        if (this.formConcept.get('amount').value > 0) {
          if (Date.parse(this.formConcept.get('expiration').value) > Date.now()) {
            var productName = this.listProduct.find(item => item.code == this.formConcept.get('product').value);
            if (productName.complete) {
              if (Number.isInteger(this.formConcept.get('amount').value)) {
                if (this.concept.find(item => item.product == this.formConcept.get('product').value)) {
                  this.concept.find(item => item.product == this.formConcept.get('product').value).amount = this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value;
                  this.concept.find(item => item.product == this.formConcept.get('product').value).price = this.formConcept.get('price').value;
                  this.getTotal();
                }
                else {
                  this.concept.push(this.formConcept.value);
                  this.getTotal();
                }
                this.Toastr.success("Producto Agregado", "MarketAlfaApp");
                // this.formConcept.controls['amount'].setValue(1);
                // this.formConcept.controls['product'].setValue('');
                this.formConcept.reset();
                this.nameProduct = "";
                this.measureDec = "Medida";
              }
              else {
                this.Toastr.warning("Este Producto Se Vende Entero", "MarketAlfaApp");
              }
            }
            else {
              if (this.concept.find(item => item.product == this.formConcept.get('product').value)) {
                this.concept.find(item => item.product == this.formConcept.get('product').value).amount = this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value;
                this.concept.find(item => item.product == this.formConcept.get('product').value).price = this.formConcept.get('price').value;
                this.getTotal();
              }
              else {
                this.concept.push(this.formConcept.value);
                this.getTotal();
              }
              this.Toastr.success("Producto Agregado", "MarketAlfaApp");
              // this.formConcept.controls['amount'].setValue(1);
              // this.formConcept.controls['product'].setValue('');
              this.formConcept.reset();
              this.nameProduct = "";
              this.measureDec = "Medida";
            }
          }
          else {
            this.Toastr.warning("La Fecha de Expiración no debe ser menor a la Fecha Actual", "MarketAlfaApp");
          }
        }
        else {
          this.Toastr.info("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.info("El Precio debe ser mayor a 0", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("El Código de este Producto no es Valido", "MarketAlfaApp");
    }
  }

  addOrder() {
    if (this.request.code.length > 6) {
      if (!this.listCode.includes(this.request.code)) {
        this.request.products = this.concept;
        console.log(this.request);
        if (this.concept.length > 0) {
          this.api.create(this.request).subscribe(x => {
            if (x.success === 1) {
              this.dialogRef.close();
              this.Toastr.success("Pedido Recibido", "MarketAlfaApp");
              this.router.navigate(['/inventary']);
            }
            else {
              this.Toastr.warning("Ingrese los Campo de Manera Correcta", "MarketAlfaApp");
            }
          });
        }
        else {
          this.Toastr.warning("El Pedido debe tener al menos 1 producto", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("Esta Factura ya esta Registrada", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("Ingrese una Factura Valida", "MarketAlfaApp");
    }
  }
}
