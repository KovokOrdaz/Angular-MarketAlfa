import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Distributor } from '../models/distributor';
import { ApiDistributorService } from '../services/apidistributor.service';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.scss']
})
export class DistributorComponent implements OnInit {

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: Distributor[] = [];
  temp:Distributor[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name:'Nombre' }, 
    { prop: 'rif', name: 'RIF'},
    { prop: 'phone', name:'Telefono' },
    { prop: 'ls', name:'Estructura Legal' }];
readonly width: string = '600px';


  constructor(private api: ApiDistributorService, public dialog: MatDialog, public snackBar: MatSnackBar) 
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

  onActivate(event: Distributor) {
    console.log('Activate Event', event);
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: { Name: string; }) {
      return d.Name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
