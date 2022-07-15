import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConceptOrder, Order, Product, User } from 'src/app/models';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';
import { DialogorderdetailComponent } from '../dialogorderdetail/dialogorderdetail.component';
import { map, startWith } from 'rxjs/operators';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogordermd',
  templateUrl: './dialogordermd.component.html',
  styleUrls: ['./dialogordermd.component.scss']
})
export class DialogordermdComponent implements OnInit {
  public listDist: any[] = [];
  public listProduct: any[] = [];
  public listProductTemp: any[] = [];
  public listCode: string[] = [];
  public listRif: string[] = [];
  public complete: boolean = true;
  public productForm: number = 0;
  public nameProduct: string = "";
  public nameDistribuidor: string = "";
  public measureProduct: string = "Ordaz";
  public measureDec: string = "Medida";
  public dateV: Date;
  user !: User;
  public order: Order;
  public concept: ConceptOrder[];
  public formConcept = this.formBuilder.group
    ({
      product: [null],
      amount: [null]
    });

  filteredOptions: Observable<Product[]>;

  constructor(public dialogRef: MatDialogRef<DialogordermdComponent>, private router: Router, public apiAuth: ApiAuthService, public formBuilder: FormBuilder, public dialogDetail: MatDialogRef<DialogorderdetailComponent>, public api: ApiOrderService, public apiDist: ApiDistributorService, public apiProduct: ApiProductService, public Toastr: ToastrService) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
    this.concept = [];
    this.order = { distributor: '', receive: '', user: this.user.id, concepts: [] };
    this.read();
  }

  ngOnInit(): void {
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

  read() {
    this.apiDist.read().subscribe(x => { this.listDist = x.data; });
    this.apiDist.readRif().subscribe(x => { this.listRif = x.data; });
    this.apiProduct.read().subscribe(x => { this.listProduct = x.data; });
    this.apiProduct.readCode().subscribe(x => { this.listCode = x.data; });
  }

  filterStates(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.listDist.filter(option => option.name.toLowerCase().includes(filterValue) || option.rif.toLowerCase().includes(filterValue));
      //return this.listDist.filter(state => state.name .toLowerCase().startsWith(filterValue));
    }

    return this.listDist;
  }

  codeValidation(): void {
    console.log(this.formConcept.get('product').value);
    if (!this.listCode.includes(this.formConcept.get('product').value)) {
      this.Toastr.warning("Este Código de Producto no Existe", "MarketAlfaApp");
    }
    else {
      this.apiProduct.getMeasure(this.formConcept.get('product').value).subscribe(x => { this.measureDec = x.data; });
      console.log(this.measureDec);
    }
  }

  distributorValidation() {
    if (this.listRif.includes(this.order.distributor)) {
      var productName = this.listDist.find(item => item.rif == this.order.distributor);
      this.nameDistribuidor = productName.name;
    }
    else {
      this.nameDistribuidor = "";
    }
    this.resetListProduct();
  }

  codeMeasure(): void {
    if (this.listCode.includes(this.formConcept.get('product').value)) {
      this.apiDist.read().subscribe(x => { this.listDist = x.data; console.log(this.listDist) });
      var productName = this.listProduct.find(item => item.code == this.formConcept.get('product').value);
      this.measureDec = productName.description;
      this.nameProduct = productName.name;
    }
    else {
      this.nameProduct = "";
    }
  }

  resetListProduct(): void {
    this.apiDist.read().subscribe(x => { this.listDist = x.data; console.log(this.listDist) });
  }

  rifValidation(): void {
    var REGEXRIF = '^[JGVEP][-][0-9]{8}[-][0-9]{1}$';
    if (!this.order.distributor.match(REGEXRIF)) {
      this.Toastr.warning("Use un RIF Valido", "MarketAlfaApp");
    }
    else {
      if (!this.listRif.includes(this.order.distributor)) {
        this.Toastr.warning("Este Rif Ya esta Registrado", "MarketAlfaApp");
      }
    }
  }

  public getName(code: string): string {
    var productName = this.listProduct.find(item => item.code == code);
    return productName.name;
  }

  getMeasure(code: string) {
    var productName = this.listProduct.find(item => item.code == code);
    return productName.acronym;
  }

  close() { this.dialogRef.close() }

  addContent() {
    if (this.listCode.includes(this.formConcept.get('product').value)) {
      if (this.formConcept.get('amount').value > 0) {
        var productName = this.listProduct.find(item => item.code == this.formConcept.get('product').value)
        if (productName.complete) {
          if (Number.isInteger(this.formConcept.get('amount').value)) {
            if (this.concept.find(item => item.product == this.formConcept.get('product').value)) {
              this.concept.find(item => item.product == this.formConcept.get('product').value).amount = this.concept.find(item => item.product == this.formConcept.get('product').value).amount + this.formConcept.get('amount').value;
            }
            else {
              this.concept.push(this.formConcept.value);
            }
            this.Toastr.success("Producto Agregado", "MarketAlfaApp");
            //this.formConcept.controls['amount'].setValue(1);
            //this.formConcept.controls['product'].setValue('');
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
          }
          else {
            this.concept.push(this.formConcept.value);
          }
          this.Toastr.success("Producto Agregado", "MarketAlfaApp");
          // this.formConcept.controls['amount'].setValue(1);
          // this.formConcept.controls['product'].setValue('');
          this.formConcept.reset();
          this.nameProduct = "";
          this.measureDec = "Medida";
        }
        console.log(this.complete);
      }
      else {
        this.Toastr.warning("La Cantidad debe ser mayor a 0", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("el Código de este Producto no es Valido", "MarketAlfaApp");
    }
  }

  deleteConcept(product: string) {
    var newConcept = this.concept.filter((item) => item.product !== product);
    this.concept = newConcept;
  }

  addOrder() {
    if (this.listRif.includes(this.order.distributor)) {
      if (Date.parse(this.order.receive) > Date.now()) {
        if (this.concept.length > 0) {
          this.order.concepts = this.concept;
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
          this.Toastr.warning("El Pedido Requiere al menos 1 Productos", "MarketAlfaApp");
        }
      }
      else {
        this.Toastr.warning("La Fecha de Entrega no puede ser Inferior a la Fecha de Emisión", "MarketAlfaApp");
      }
    }
    else {
      this.Toastr.warning("Rif del Proveedor Invalido", "MarketAlfaApp");
    }
  }

  // create() {
  //   const master: OrderX = { id: this.id, date: this.date, distributor: this.distributor, recieve: this.receive, status: this.status }
  //   console.log(master);
  //   this.api.create(master).subscribe(result => {
  //       if (result.success === 1) {
  //           this.dialogRef.close();
  //           this.snackBar.open('Registro Correcto', '', { duration: 2000 });
  //       }
  //   });
  // }

  // update() {
  //   const master: OrderX = { id: this.id, date: this.date, distributor: this.distributor, recieve: this.receive, status: this.status }
  //   console.log(master);
  //   this.api.update(master).subscribe(result =>
  //       {
  //           if(result.success === 1)
  //           {
  //               this.dialogRef.close();
  //               this.snackBar.open('Registro Modificado Correctamente', '', {duration: 2000});
  //           }
  //       });
  // }
}
