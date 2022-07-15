import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../services/exportexcel.service';
import { Client, Order, User } from '../models';
import { ApiDistributorService } from '../services/apidistributor.service';
import { ApiOrderService } from '../services/apiorder.service';
import { AddorderComponent } from './addorder/addorder.component';
import { ApiAuthService } from '../services/apiauth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogorderComponent } from './dialogorder/dialogorder.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  title: string = "Pedidos";
  user !: User;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'id', name:'#' }, 
    { prop: 'distributor', name: 'Proveedor' },
    { prop: 'recieve', name: 'Fecha de Llegada' }];
  constructor( private api: ApiOrderService, public apiAuth: ApiAuthService, private excel:ExportExcelService, public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router, public Toastr: ToastrService) 
  {
    this.apiAuth.user.subscribe(x => { if(x.privilege){ this.user = x} else { this.router.navigate(['/registeruser']); } });
  }

  ngOnInit(): void 
  {
    this.read();
  }

  read()
  {
    this.api.read().subscribe(x=>{ this.rows = x.data;
      this.temp = this.rows;});
  }

  onSelect({ }) {
    console.log('Select Event', this.selected, this.selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: { name: string; }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(entity: Order)
  {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {data: entity});
    dialogRef.afterClosed().subscribe(finish => 
      {
        if(finish)
        {
          // this.api.delete().subscribe(result => 
          //   {
          //     if(result.success === 1)
          //     {
          //       this.snackBar.open('Registro Inactivado','',{duration: 2000});
          //       this.read();
          //     }
          //   });
        }
      });
  }

  createExcel():void
  {
    this.excel.create(this.temp, this.title);
  }

  openEdit(entity: Order)
  {
    const dialogRef = this.dialog.open(DialogorderComponent, {data: entity});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }

  openCreate() 
  {
    const dialogRef = this.dialog.open(DialogorderComponent);
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }
}
