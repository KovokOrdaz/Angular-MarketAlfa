import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConceptOrder, Order, Product } from 'src/app/models';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import { ApiorderconceptService } from 'src/app/services/apiorderconcept.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({
  selector: 'app-dialogorderdetail',
  templateUrl: './dialogorderdetail.component.html',
  styleUrls: ['./dialogorderdetail.component.scss']
})
export class DialogorderdetailComponent implements OnInit {
  public id: number = 0;
  public orderD: number = 0;
  public product: number= 0;
  public amount: number = 0;

  public distributor: string; 

  public items: any[] = [];
  public listProduct: any[] = [];

  constructor(public dialogRef: MatDialogRef<DialogorderdetailComponent>, public api: ApiOrderService, public apiOC: ApiorderconceptService, public apiProduct: ApiProductService, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public entity: ConceptOrder) 
  {
    this.read();
  }

  ngOnInit(): void {
  }

  read()
  {
    this.apiProduct.read().subscribe(x=>{ this.listProduct= x.data;});
    this.api.first().subscribe(x=>{ this.orderD = x.data.id;
      this.distributor = x.data.name;
    });
    this.apiOC.select(this.orderD).subscribe(x=>{this.items = x.data});
  }

  close() { this.dialogRef.close() }

  delete(entity: number)
  {
    this.apiOC.delete(entity).subscribe(result => 
            {
              if(result.success === 1)
              {
                this.snackBar.open('Registro Eliminado','',{duration: 2000});
                this.read();
              }
            })
  }

  deleteOrder()
  {
    this.api.delete(this.orderD).subscribe(result => 
            {
              if(result.success === 1)
              {
                this.snackBar.open('Registro Eliminado','',{duration: 2000});
                this.read();
              }
            })
  }

  // create()
  // {
  //   const entity: ConceptOrder = { id: this.id, orderD: this.orderD, product: this.product, amount: this.amount }
  //   this.apiOC.create(entity).subscribe(result => 
  //           {
  //             if(result.success === 1)
  //             {
  //               this.snackBar.open('Agregado','',{duration: 2000});
  //               this.read();
  //             }
  //             else
  //             {
  //               console.log(result.data);
  //             }
  //           })
  // }

}
