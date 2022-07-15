import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { Business } from 'src/app/models/business';
import { InventoryProductReason } from 'src/app/models/inventoryProductReason';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { ApibuyService } from 'src/app/services/apibuy.service';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';
import { ApilotService } from 'src/app/services/apilot.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-dialogretreat',
  templateUrl: './dialogretreat.component.html',
  styleUrls: ['./dialogretreat.component.scss']
})
export class DialogretreatComponent implements OnInit {
  id: number = 0;
  product: string = "";
  amount: number = 0;
  price: number = 0;
  expiration: string = "";
  lot: number;
  reason: string = "";
  amountLot: number = 0;
  amountLotDec: string = "";

  public list: any[] = [];
  public listProduct: any[] = [];
  public listCode: string[] = [];
  public listLot: any[] = [];
  public listLotTemp: any[] = [];

  public business: Business;
  public coin: string = "";
  public nameProduct: string = "";

  public measureDec: string = "Medida";

  user !: User;

  constructor(public dialogRef: MatDialogRef<DialogretreatComponent>, public api: ApiinventoryService, public apiBuy: ApibuyService, public apiLot: ApilotService, private router: Router, public apiAuth: ApiAuthService, public apiBusiness: ApiBusinessService, public apiProduct: ApiProductService, public Toastr: ToastrService) {
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
    if (this.listLot.find(item => item.lot == this.lot)) {
      var lot = this.listLot.find(item => item.lot == this.lot);
      if (this.amount > lot.amount) {
        this.Toastr.warning("La Cantidad no Puede Ser Mayor a la Existencia", "MarketAlfaApp");
      }
    }
  }

  read() {
    this.apiBuy.selectProduct().subscribe(x => { this.listProduct = x.data; console.log(x.data); });
    this.apiProduct.readCode().subscribe(x => { this.listCode = x.data; });
    this.apiLot.readLotProduct().subscribe(x => { this.listLot = x.data; });
  }

  resetListProduct(): void {
    this.apiBuy.selectProduct().subscribe(x => { this.listProduct = x.data; console.log(x.data); });
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
        this.listLotTemp = this.listLot.filter(option => option.code.toLowerCase() == this.product);
      });
    }
    else {
      this.nameProduct = "";
    }
    this.resetListProduct();
  }
  public reasonValidation(): void {
    if (this.reason.length < 10) {
      this.Toastr.warning("La Razón para Retirar Producto debe ser mayor a 9 caracteres", "MarketAlfaApp");
    }
  }
  public codeLot(): void {
    console.log(this.lot)
    if (this.listLot.find(item => item.lot == this.lot && item.code == this.product)) {
      var lot = this.listLot.find(item => item.lot == this.lot && item.code == this.product);
      console.log(lot);
      this.amountLot = lot.amount - lot.sold;
      this.amountLotDec = this.amountLot + " " + lot.measure;
    }
    else {
      this.amountLotDec = "";
      // this.Toastr.warning("Seleccione Un Lote Valido Para el Producto", "MarketAlfaApp");
    }
    this.resetListProduct();
  }

  close() { this.dialogRef.close() }

  create() {
    if (this.listCode.includes(this.product)) {
      var productName = this.listProduct.find(item => item.code == this.product);
      if (this.listLot.find(item => item.lot == this.lot && item.code == this.product)) {
        var lot = this.listLot.find(item => item.lot == this.lot && item.code == this.product);
        if (this.amount > 0) {
          if (this.reason.length > 9) {
            if (lot.amount > this.amount) {
              console.log(productName);
              if (productName.isComplete) {
                if (Number.isInteger(this.amount)) {
                  const entity: InventoryProductReason = {
                    product: this.product, amount: this.amount, registerBy: this.user.id, reason: this.reason, lot: this.lot
                  }
                  console.log(entity);
                  this.apiLot.deleteProduct(entity).subscribe(result => {
                    if (result.success === 1) {
                      this.dialogRef.close();
                      this.Toastr.success("Retiro Correcto", "MarketAlfaApp");
                      this.router.navigate(['/inventary']);
                    }
                  });
                }
                else {
                  this.Toastr.warning("Este Producto Se Vende Entero", "MarketAlfaApp");
                }
              }
              else {
                const entity: InventoryProductReason = {
                  product: this.product, amount: this.amount, registerBy: this.user.id, reason: this.reason, lot: this.lot
                }
                console.log(entity);
                this.apiLot.deleteProduct(entity).subscribe(result => {
                  if (result.success === 1) {
                    this.dialogRef.close();
                    this.Toastr.success("Retiro Correcto", "MarketAlfaApp");
                    this.router.navigate(['/inventary']);
                  }
                });
              }
            }
            else {
              this.Toastr.warning("La Cantidad No Puede Ser Mayor a la Existencia del Lote", "MarketAlfaApp");
            }
          }
          else {
            this.Toastr.warning("La Razón para Retirar Producto debe ser mayor a 9 caracteres", "MarketAlfaApp");
          }
        }
        else {
          this.Toastr.warning("La Cantidad debe ser Mayor a 0", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("Seleccione Un Lote Valido Para el Producto", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("El Código de este Producto no es Valido", "MarketAlfaApp");
    }
  }
}
