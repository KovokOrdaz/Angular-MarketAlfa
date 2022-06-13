import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConceptOrder } from "src/app/models/conceptOrder";
import { Order } from "src/app/models/order";
import { ApiorderService } from "src/app/services/apiorder.service";

@Component({templateUrl: 'dialogorder.component.html'})
export class DialogOrderComponent
{
    public order: Order;
    public concept: ConceptOrder[];
    public formConcept = this.formBuilder.group
    ({
        product: [0, Validators.required],
        amount: [1, Validators.required],
    });

    constructor(public dialogRef: MatDialogRef<DialogOrderComponent>, public snackBar: MatSnackBar, private formBuilder: FormBuilder, public api: ApiorderService)
    {
        this.concept= [];
        this.order = { distributor: 1, receive: Date.now.toString(), concepts: []}
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
        this.api.create(this.order).subscribe(x => 
            {
                if(x.success === 1)
                {
                    this.dialogRef.close();
                    this.snackBar.open('Pedido Registrado', '', {duration: 2000});
                }
            });
    }
}