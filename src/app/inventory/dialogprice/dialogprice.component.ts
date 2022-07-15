import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Price } from 'src/app/models/price';
import { Business } from 'src/app/models/business';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';

@Component({
  selector: 'app-dialogprice',
  templateUrl: './dialogprice.component.html',
  styleUrls: ['./dialogprice.component.scss']
})
export class DialogpriceComponent implements OnInit {
  public money: number;
  public listInv : any[] = [];

  public business: Business;
  public coin: string = "";
  constructor(public dialogRef: MatDialogRef<DialogpriceComponent>, public apiBusiness: ApiBusinessService, public api: ApiinventoryService, public Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public id: number) 
  {
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin =x.data.acronym });
  }

  ngOnInit(): void 
  {
    this.api.read().subscribe(x=>{ console.log(x.data); this.listInv = x.data;});
  }

  moneyValidation() : void
  {
    if(!(this.money > 0))
    {
      this.Toastr.warning("El Precio No Puede ser Menor a 1","MarketAlfaApp");
    }
  }

  close() { this.dialogRef.close() }
 
  create() 
  {
    if(this.money > 0)
      {
        const entity: Price = { id: this.id, money: this.money}
        console.log(entity);
        this.api.changePrice(entity).subscribe(result => {
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
      else
      {
        this.moneyValidation();
      }
    }
  }
