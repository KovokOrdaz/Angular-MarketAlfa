import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'src/app/models/alert';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';

@Component({
  selector: 'app-dialogalert',
  templateUrl: './dialogalert.component.html',
  styleUrls: ['./dialogalert.component.scss']
})
export class DialogalertComponent implements OnInit {
  public low: number = 12;
  public lock: number = 0;
  public product: number; 
  public listProduct: any[] = []; 
  public measureDec: string = "Medida";
  constructor(public dialogRef: MatDialogRef<DialogalertComponent>, public api: ApiinventoryService, public Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public id: number) 
  {
    this.product = id;
  }

  ngOnInit(): void 
  {
    this.api.read().subscribe(x => { this.listProduct = x.data; var productName = this.listProduct.find(item => item.id == this.id); this.measureDec = productName.measure;});
  }

  lowValidation() :void
  {
    if(!(this.low > 0))
    {
      this.Toastr.warning("La Alerta de Bajo Inventario debe ser mayor a 0","MarketAlfaApp");
    }
  }

  lockValidation() :void
  {
    if(!(this.lock > 0))
    {
      this.Toastr.warning("La Reserva debe ser mayor a 0","MarketAlfaApp");
    }
  }

  close() { this.dialogRef.close() }
 
    create() {
      if(this.low > 0 && this.lock > 0)
      {
        if(this.low < this.lock)
        {
          this.Toastr.warning("La Reserva no debe ser mayor a la Alerta","MarketAlfaApp");
        }
        else
        {
          const entity: Alert = { id: this.id, low: this.low, lock: this.lock }
        console.log(entity);
        this.api.changeAlert(entity).subscribe(result => {
            if (result.success === 1) 
            {
                this.dialogRef.close();
                this.Toastr.success("registro correcto","MarketAlfaApp");
            }
            else 
            {
              this.Toastr.warning("registro incorrecto","MarketAlfaApp");
            }
        });
        }
      }
      else
      {
        this.lockValidation();
        this.lowValidation();
      }
    }

}
