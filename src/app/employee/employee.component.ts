import { Component, ViewChild, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Employee } from '../models/employee';
import { ApiEmployeeService } from '../services/apiemployee.service';
import { DialogEmployeeComponent } from './dialogemployee/dialogemployee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: Employee[] = [];
  temp:Employee[] = [];
  selected:any = [];
  

  public display: string[] = ['id', 'name', 'nationality', 'dni', 'dateOfBirth', 'phone', 'socialSecurity', 'job',  'input', 'output', 'salary', 'datePay', 'date'];
  
  columns: any[] = [
    { prop: 'name', name:'Nombre' }, 
    { prop: 'nationality', name: 'Nacionalidad' }, 
    { prop: 'dni', name: 'Cedula o Pasaporte'},
    { prop: 'job', name:'Ocupacion' },
    { prop: 'input', name:'Entrada' },
    { prop: 'output', name:'Salida' },];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  
  constructor(private api: ApiEmployeeService) {
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

  onActivate(event: Employee) {
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
}
