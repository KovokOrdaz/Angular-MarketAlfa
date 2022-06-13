import { Component, ViewChild, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiClientService } from '../services/apiclient.service';
import { DialogClientComponent } from './dialog/dialogclient.component';
import { Client } from '../models/client';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: Client[] = [];
  temp:Client[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name:'Nombre' }, 
    { prop: 'nationality', name: 'Nacionalidad' }, 
    { prop: 'dni', name: 'Cedula o Pasaporte'},
    { prop: 'phone', name:'Telefono' },];
readonly width: string = '600px';


  constructor(private api: ApiClientService, public dialog: MatDialog, public snackBar: MatSnackBar) 
  {
    this.read();
  }

  ngOnInit(): void {
  }

  read()
  {
    this.api.read().subscribe(x=>{ this.rows = x.data;
      this.temp = x.data;});
  }

  onSelect({ }) {
    console.log('Select Event', this.selected, this.selected);
  }

  onActivate(event: Client) {
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
    const dialogRef = this.dialog.open(DialogClientComponent, {width: this.width});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }
  
  openEdit(entity: Client)
  {
    const dialogRef = this.dialog.open(DialogClientComponent, {width: this.width, data: entity});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }

  delete(entity: Client)
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
