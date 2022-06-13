import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogProductComponent } from './dialog/dialogproduct.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';
import { ApiProductService } from '../services/apiproduct.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title: string = "Productos";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: Product[] = [];
  temp: Product[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name:'Nombre' }, 
    { prop: 'nationality', name: 'Nacionalidad' }, 
    { prop: 'dni', name: 'Cedula o Pasaporte'},
    { prop: 'phone', name:'Telefono' },];
readonly width: string = '600px';
  
  constructor(private api: ApiProductService, public dialog: MatDialog, public snackBar: MatSnackBar){}

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

  onActivate(event: Product) {
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


  openCreate()
  {
    const dialogRef = this.dialog.open(DialogProductComponent, {width: this.width});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }
  
  openEdit(entity: Product)
  {
    const dialogRef = this.dialog.open(DialogProductComponent, {width: this.width, data: entity});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }

  delete(entity: Product)
  {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {width: this.width, data: entity});
    dialogRef.afterClosed().subscribe(finish => 
      {
        if(finish)
        {
          this.api.delete(entity.id).subscribe(result => 
            {
              if(result.success === 1)
              {
                this.snackBar.open('Registro Academico Eliminado Correctamente','',{duration: 2000});
                this.read();
              }
            });
        }
      });
  }

}