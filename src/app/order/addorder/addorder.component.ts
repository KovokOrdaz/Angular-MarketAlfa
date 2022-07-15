import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ConceptOrder, Order } from 'src/app/models';
import { OrderX } from 'src/app/models/orderX';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { ApiDistributorService } from 'src/app/services/apidistributor.service';
import { ApiMeasureService } from 'src/app/services/apimeasure.service';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({ 
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss']
})
export class AddorderComponent{
  rows: any[] = [];
  temp: any[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
   public order: OrderX;
   public id: number = 0;
   public distributor: number = 0;
    public receive: Date;
    public date: Date;
    public status: boolean = true;
    public listDist: any[] =[];
  constructor(public dialogRef: MatDialogRef<AddorderComponent>, public snackBar: MatSnackBar, private formBuilder: FormBuilder, public api: ApiOrderService, public apiDist:ApiDistributorService, @Inject(MAT_DIALOG_DATA) public entity: OrderX)
  {
    this.read();
    this.distributor = entity.distributor;
    this.receive = entity.recieve;
  }

  read() {
    this.apiDist.read().subscribe(x => { this.listDist = x.data; });
}

close()
{
    this.dialogRef.close();
}

create() {
  // const master: OrderX = { id: this.id, date: this.date, distributor: this.distributor, recieve: this.receive, status: this.status }
  // console.log(master);
  // this.api.create(master).subscribe(result => {
  //     if (result.success === 1) {
  //         this.dialogRef.close();
  //         this.snackBar.open('Registro Correcto', '', { duration: 2000 });
  //     }
  // });
}

update() {
  // const master: OrderX = { id: this.id, date: this.date, distributor: this.distributor, recieve: this.receive, status: this.status }
  // console.log(master);
  // this.api.update(master).subscribe(result => 
  //     { 
  //         if(result.success === 1)
  //         { 
  //             this.dialogRef.close();
  //             this.snackBar.open('Registro Modificado Correctamente', '', {duration: 2000});
  //         }
  //     });
}
}
