import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConceptOrder, Order, User } from 'src/app/models';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-dialogproductorder',
  templateUrl: './dialogproductorder.component.html',
  styleUrls: ['./dialogproductorder.component.scss']
})
export class DialogproductorderComponent implements OnInit {
  public listDistSpeed: any[] = [];
  public listDistSpeedProduct: any[] = [];
  public listDistRespet: any[] = [];
  public listDistRespetProduct: any[] = [];
  public listDistCommon: any[] = [];
  public listDistUltime: any[] = [];
  public listProduct: any[] = [];
  public productX: any;

  public order: Order;
  public concept: ConceptOrder[];
  public name: string;
  public receive: string;
  public amount: number = 1;
  public product: string;
  public measureDec: string = "Medida";
  user !: User;

  constructor(public dialogRef: MatDialogRef<DialogproductorderComponent>, private router: Router, public apiAuth: ApiAuthService, public api: ApiOrderService, public apiProduct: ApiProductService, public Toastr: ToastrService, public apiDist: ApiDistributorService, @Inject(MAT_DIALOG_DATA) public id: string, @Inject(MAT_DIALOG_DATA) public nameProduct: string) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
    this.concept = [];
    this.order = { distributor: '', receive: '', user: this.user.id, concepts: [] };
  }

  close() { this.dialogRef.close() }


  ngOnInit(): void {
    this.product = this.id;
    this.name = this.nameProduct;
    this.apiDist.speed().subscribe(x => { this.listDistSpeed = x.data; console.log(this.listDistSpeed) });
    this.apiDist.respet().subscribe(x => { this.listDistRespet = x.data; console.log(this.listDistRespet) });
    this.apiDist.speedProduct(this.product).subscribe(x => { this.listDistSpeedProduct = x.data; console.log(this.listDistSpeedProduct) });
    this.apiDist.respetProduct(this.product).subscribe(x => { this.listDistRespetProduct = x.data; console.log(this.listDistRespetProduct) });
    //this.apiDist.ultimate().subscribe(x=>{ this.listDistUltime = x.data; console.log(this.listDistUltime) });
    this.apiDist.common().subscribe(x => { this.listDistCommon = x.data; console.log(this.listDistCommon) });
    this.apiProduct.read().subscribe(x => { this.listProduct = x.data; console.log(this.listProduct); var productName = this.listProduct.find(item => item.code == this.product); this.measureDec = productName.acronym; });
  }

  addOrder(distributor: string) {
    if (this.receive.length < 8) {
      this.Toastr.warning("Ingrese una Fecha", "MarketAlfaApp");
    }
    else {
      if (Date.parse(this.receive) < Date.now()) {
        this.Toastr.warning("La Fecha de Entrega no puede ser Inferior a la Fecha de Emision", "MarketAlfaApp");
      }
      else {
        this.productX = this.listProduct.find(item => item.code == this.product)
        this.order.receive = this.receive;
        this.order.distributor = distributor;
        this.concept.push({ product: this.product, amount: this.amount });
        this.order.concepts = this.concept;
        console.log(this.order);
        if (this.amount > 0) {
          if (this.productX.complete) {
            if (Number.isInteger(this.amount)) {
              console.log(this.order);
              this.api.create(this.order).subscribe(x => {
                if (x.success === 1) {
                  this.dialogRef.close();
                  this.Toastr.success("Pedido Registrado", "MarketAlfaApp");
                }
                else {
                  this.Toastr.warning("Ingrese los Campo de Manera Correcta", "MarketAlfaApp");
                }
              });
            }
            else {
              this.Toastr.warning("Este Producto Se Vende Entero", "MarketAlfaApp");
            }
          }
          else {
            console.log(this.order);
            this.api.create(this.order).subscribe(x => {
              if (x.success === 1) {
                this.dialogRef.close();
                this.Toastr.success("Pedido Registrado", "MarketAlfaApp");
              }
              else {
                this.Toastr.warning("Ingrese los Campo de Manera Correcta", "MarketAlfaApp");
              }
            });
          }
        }
        else {
          console.log(this.order);
          this.Toastr.warning("La Cantida debe ser mayor a 0", "MarketAlfaApp");
        }
      }
    }
  }

  dateValidation(): void {
    if (this.receive.length < 8) {
      this.Toastr.warning("Ingrese una Fecha Valida", "MarketAlfaApp");
    }
    else {
      if (Date.parse(this.receive) < Date.now()) {
        this.Toastr.warning("La Fecha de Entrega no puede ser Inferior a la Fecha de Emision", "MarketAlfaApp");
      }
    }

  }

  amountValidation() {
    if (!(this.amount > 0)) {
      this.Toastr.warning("La Cantida debe ser mayor a 0", "MarketAlfaApp");
    }
  }
}

