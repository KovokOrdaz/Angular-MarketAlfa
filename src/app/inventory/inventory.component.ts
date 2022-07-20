import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApiinventoryService } from '../services/apiinventory.service';
import { ExportExcelService } from '../services/exportexcel.service';
import { DialogalertComponent } from './dialogalert/dialogalert.component';
import { DialogentryComponent } from './dialogentry/dialogentry.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DialogpriceComponent } from './dialogprice/dialogprice.component';
import { ApiAuthService } from '../services/apiauth.service';
import { User } from '../models';
import { DialogretreatComponent } from './dialogretreat/dialogretreat.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  title: string = "Inventario";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [];

  user!: User;

  constructor(private api: ApiinventoryService, public apiAuth: ApiAuthService, private excel: ExportExcelService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.apiAuth.user.subscribe(x => { this.user = x; });
  }

  ngOnInit(): void {
    this.read();
  }
  read() {
    this.apiAuth.user.subscribe(x => {
      if (x.privilege) {
        this.api.read().subscribe(x => {
          this.rows = x.data;
          this.temp = this.rows;
        });
        this.columns = [
          { prop: 'name', name: 'Nombre' },
          { prop: 'code', name: 'Código' },
          { prop: 'category', name: 'Categoría' },
          { prop: 'amount', name: 'Cantidad' },
          { prop: 'price', name: 'Precio' },
          { prop: 'low', name: 'Alerta' },
          { prop: 'lock', name: 'Reserva' }];
      }
      else {
        this.api.read().subscribe(x => {
          this.rows = [...x.data];
          this.temp = this.rows;
        });
        this.columns = [
          { prop: 'name', name: 'Nombre' },
          { prop: 'code', name: 'Codigo' },
          { prop: 'category', name: 'Categoria' },
          { prop: 'amount', name: 'Cantida' },
          { prop: 'price', name: 'Precio' }];
      }
    });
    this.api.read().subscribe(x => {
      console.log(x.data); this.rows = x.data; this.temp = this.rows;

    });
  }

  onSelect({ }) {
    console.log('Select Event', this.selected, this.selected);
  }

  onActivate(event: any) {
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

  entry() {
    const dialogRef = this.dialog.open(DialogentryComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  retreat() {
    const dialogRef = this.dialog.open(DialogretreatComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  alertChange(product: number) {
    const dialogRef = this.dialog.open(DialogalertComponent, { data: product });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  priceChange(product: number) {
    const dialogRef = this.dialog.open(DialogpriceComponent, { data: product });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  clearSelection(): void {
    this.selected = [];
  }

  openCreate(entity: any) {
    // const dialogRef = this.dialog.open(DialogProductComponent);
    // dialogRef.afterClosed().subscribe(finish => {this.read()});
  }

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
      docResult.save(`Inventario_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}
