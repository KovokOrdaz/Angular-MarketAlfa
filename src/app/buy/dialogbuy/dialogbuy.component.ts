import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DialogClientComponent } from 'src/app/client/dialog/dialogclient.component';
import { BuyVM } from 'src/app/models/buyVM';
import { ConceptBuy } from 'src/app/models/conceptBuy';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApibuyService } from 'src/app/services/apibuy.service';
import { ApiClientService } from 'src/app/services/apiclient.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { DialogshowbuyComponent } from '../dialogshowbuy/dialogshowbuy.component';

@Component({
  selector: 'app-dialogbuy',
  templateUrl: './dialogbuy.component.html',
  styleUrls: ['./dialogbuy.component.scss']
})
export class DialogbuyComponent implements OnInit {
  user !: User;

  public business: Business;
  public coin: string = "";
  public listProduct: any[] = [];
  public listCode: string[] = [];
  public listClient: any[] = [];
  public complete: boolean = false;
  public max: number = 0;
  public priceTotal: number = 0;
  public measureDec: string = "Medida";
  filteredOptions: Observable<any[]>;
  public buy: BuyVM;
  public concept: ConceptBuy[];
  public formConcept = this.formBuilder.group
    ({
      product: [null],
      amount: [1],
      price: [1]
    });
  public nameProduct: string = "";

  constructor(public dialogRef: MatDialogRef<DialogbuyComponent>, public apiBusiness: ApiBusinessService, public dialog: MatDialog, public apiProduct: ApiProductService, public apiAuth: ApiAuthService, public formBuilder: FormBuilder, public api: ApibuyService, public apiClient: ApiClientService, public Toastr: ToastrService) {
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin = x.data.acronym });
    this.concept = [];
    this.buy = { client: '', seller: 0, Concepts: [] };
    console.log(this.buy);
  }
  ngOnInit(): void {
    this.apiAuth.user.subscribe(x => { this.user = x; });
    this.apiClient.read().subscribe(x => { this.listClient = x.data; console.log(x.data); });
    this.api.selectProduct().subscribe(x => { this.listProduct = x.data; console.log(x.data); });
    this.apiProduct.readCode().subscribe(x => { this.listCode = x.data; });
    this.filteredOptions = this.formConcept.get('product').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.listProduct.slice())),
    );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.listProduct.filter(option => option.name.toLowerCase().includes(filterValue) || option.code.toLowerCase().includes(filterValue));
  }

  codeMeasure(): void {
    if (this.listCode.includes(this.formConcept.get('product').value)) {
      var productName = this.listProduct.find(item => item.code == this.formConcept.get('product').value);
      this.measureDec = productName.measure;
      this.nameProduct = productName.name;
    }
    else {
      this.nameProduct = "";
    }
  }

  close() { this.dialogRef.close() }

  resetList(): void {
    this.apiClient.read().subscribe(x => { this.listClient = x.data; console.log(x.data); });
  }

  filterStates(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.listClient.filter(option => option.name.toLowerCase().includes(filterValue) || option.dni.toLowerCase().includes(filterValue));
      //return this.listDist.filter(state => state.name .toLowerCase().startsWith(filterValue));
    }

    return this.listClient;
  }

  amountValidation(): void {
    if (!(this.formConcept.get('amount').value > 0)) {
      this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
    }
  }

  openCreateClient() {
    const dialogRef = this.dialog.open(DialogClientComponent);
    dialogRef.afterClosed().subscribe(finish => { console.log("Hello World") });
  }

  public getName(code: string): string {
    var productName = this.listProduct.find(item => item.code == code);
    return productName.name;
  }

  public getMeasure(code: string) {
    var productName = this.listProduct.find(item => item.code == code);
    console.log(productName);
    return productName.acronym;
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


  addContent() {
    if (this.listCode.includes(this.formConcept.get('product').value)) {
      if (this.formConcept.get('amount').value > 0) {
        var product = this.listProduct.find(item => item.code == this.formConcept.get('product').value);
        if (this.formConcept.get('amount').value <= product.amount) {
          if (product.isComplete) {
            if (Number.isInteger(this.formConcept.get('amount').value)) {
              if (this.concept.find(item => item.product == this.formConcept.get('product').value)) {
                if ((this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value) <= product.amount) {
                  this.concept.find(item => item.product == this.formConcept.get('product').value).amount = this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value;
                  this.Toastr.success("Producto Agregado", "MarketAlfaApp");
                }
                else {
                  this.Toastr.warning("Excede la existencia del producto, Existencia:" + product.amount + " " + product.measure, "MarketAlfaApp");
                }
              }
              else {
                this.formConcept.controls['price'].setValue(product.price);
                this.concept.push(this.formConcept.value);
                this.Toastr.success("Producto Agregado", "MarketAlfaApp");
              }
              this.getTotal();
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
              if ((this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value) <= product.amount) {
                this.concept.find(item => item.product == this.formConcept.get('product').value).amount = this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value;
                this.Toastr.success("Producto Agregado", "MarketAlfaApp");
              }
              else {
                this.Toastr.warning("Excede la existencia del producto, Existencia:" + product.amount + " " + product.measure, "MarketAlfaApp");
              }
            }
            else {
              this.formConcept.controls['price'].setValue(product.price);
              this.concept.push(this.formConcept.value);
              this.Toastr.success("Producto Agregado", "MarketAlfaApp");
            }
            this.getTotal();
            this.formConcept.reset();
            this.nameProduct = "";
            this.measureDec = "Medida";
          }
        }
        else {
          this.Toastr.warning("Excede la existencia del producto, Existencia:" + product.amount + " " + product.measure, "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("El Código de este Producto no es Valido", "MarketAlfaApp");
    }
  }

  addBuy() {
    this.buy.seller = this.user.id;
    this.buy.Concepts = this.concept;
    if (this.buy.client != "") {
      if (this.listClient.find(item => item.dni == this.buy.client)) {
        if (this.concept.length > 0) {
          console.log(this.buy);
          this.api.create(this.buy).subscribe(x => {
            if (x.success === 1) {
              this.dialogRef.close();
              this.Toastr.success("Pedido Registrado", "MarketAlfaApp");
              this.api.read().subscribe(x => {
                var PDF = x.data[0];
                const dialogRefPDF = this.dialog.open(DialogshowbuyComponent, { minWidth: "680px" });
                dialogRefPDF.componentInstance.client = PDF.client;
                dialogRefPDF.componentInstance.receive = PDF.date;
                dialogRefPDF.componentInstance.id = PDF.id;
              });

            }
            else {
              this.Toastr.warning("Ingrese los Campo de Manera Correcta", "MarketAlfaApp");
            }
          });
        }
        else {
          this.Toastr.warning("La Compra debe tener al menos 1 producto", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("Cédula o Pasaporte No atribuido a Ningún Cliente, Revise la Identificación o Registre el Cliente", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("Seleccione un cliente", "MarketAlfaApp");
    }
  }

}
