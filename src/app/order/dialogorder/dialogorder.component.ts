import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";
import { Order } from "src/app/models";
import { ConceptOrder } from "src/app/models/conceptOrder";
import { ApiDistributorService } from "src/app/services/apidistributor.service";
import { ApiOrderService } from "src/app/services/apiorder.service";

@Component({
  selector: 'app-dialogorder',
  templateUrl: './dialogorder.component.html',
  styleUrls: ['./dialogorder.component.scss']
})
export class DialogorderComponent implements OnInit {

  public order: Order;
  public concept: ConceptOrder[];
  public listDist: any[] = [];
  public formConcept = this.formBuilder.group
  ({
      product: [0, Validators.required],
      amount: [1, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<DialogorderComponent>,
      public Toastr:ToastrService, 
              public snackBar: MatSnackBar, 
              public formBuilder: FormBuilder, 
              public api: ApiOrderService, 
              public apiDist:ApiDistributorService)
  {
      this.read();
      this.concept= [];
      console.log(this.order);
  }

  read() {
      this.apiDist.read().subscribe(x => { this.listDist = x.data; console.log(this.listDist)});
  }

  close()
  {
      this.dialogRef.close();
  }

  addContent()
  {
      this.concept.push(this.formConcept.value);
  }

  addOrder()
  {
      this.order.concepts = this.concept;
      console.log(this.order);
      this.api.create(this.order).subscribe(x => 
          {
              if(x.success === 1)
              {
                  this.dialogRef.close();
                  this.Toastr.success("Pedido Registrado","MarketAlfaApp");
              }
          });
  }
 
  ngOnInit(): void {
  }

}
