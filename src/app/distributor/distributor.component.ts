import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../services/exportexcel.service';
import { Client, User } from '../models';
import { DialogDistributorComponent } from './dialogdistributor/dialogdistributor.component';
import { ApiDistributorService } from '../services/apidistributor.service';
import { Distributor } from '../models/distributor';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiAuthService } from '../services/apiauth.service';
import { Router } from '@angular/router';
import { DialoginactivedistributorComponent } from './dialoginactivedistributor/dialoginactivedistributor.component';


@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html'
})
export class DistributorComponent implements OnInit {
  user !: User;
  title: string = "Distribuidores";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    { prop: 'ls', name: 'Estructura Legal' },
    { prop: 'rif', name: 'Registro Unico Comercial' },
    { prop: 'registeredBy', name: 'Registrado Por' }];

  constructor(private api: ApiDistributorService, private router: Router, public apiAuth: ApiAuthService, private excel: ExportExcelService, public dialog: MatDialog, public snackBar: MatSnackBar, public Toastr: ToastrService) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
  }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.api.read().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
    });
  }

  onSelect({ }) {
    console.log('Select Event', this.selected, this.selected);
  }

  onActivate(event: Product) {
    console.log('Activate Event', event);
  }

  updateFilter(event: any) {
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

  clearSelection(): void {
    this.selected = [];
  }

  openCreate() {
    const dialogRef = this.dialog.open(DialogDistributorComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  openEdit(entity: Client) {
    const dialogRef = this.dialog.open(DialogDistributorComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  delete(entity: Distributor) {
    const dialogRef = this.dialog.open(DialoginactivedistributorComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  // delete(entity: Distributor) {
  //   const dialogRef = this.dialog.open(DialogDeleteComponent, { data: entity });
  //   dialogRef.afterClosed().subscribe(finish => {
  //     if (finish) {
  //       this.api.delete(entity.rif).subscribe(result => {
  //         if (result.success === 1) {
  //           this.Toastr.warning('Registro Inactivado', 'MarketAlfaApp');
  //           this.read();
  //           this.selected = [];
  //         }
  //       });
  //     }
  //   });
  // }

  createPDF() {
    const DATA = document.getElementById('tablePDF');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Distribuidores_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}
