import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogClientComponent } from './dialog/dialogclient.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ExportExcelService } from '../services/exportexcel.service';
import { Client, User } from '../models';
import { ApiClientService } from '../services/apiclient.service';
import { ApiAuthService } from '../services/apiauth.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  title: string = "Clientes";
  user !: User;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    { prop: 'nationalityName', name: 'Nacionalidad' },
    { prop: 'dni', name: 'Cédula o Pasaporte' },
    { prop: 'phone', name: 'Teléfono' },
    { prop: 'direction', name: 'Dirección' },
    { prop: 'user', name: 'Registrado por' },
    { prop: 'date', name: 'Fecha' }];

  constructor(private api: ApiClientService, private excel: ExportExcelService, public apiAuth: ApiAuthService, private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, public Toastr: ToastrService) {
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

  clearSelection(): void {
    this.selected = [];
  }

  openCreate() {
    const dialogRef = this.dialog.open(DialogClientComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  openEdit(entity: Client) {
    const dialogRef = this.dialog.open(DialogClientComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  delete(entity: Client) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => {
      if (finish) {
        this.api.delete(entity.dni).subscribe(result => {
          if (result.success === 1) {
            this.Toastr.info("Cliente Desactivado", "MarketAlfaApp");
            this.read();
            this.clearSelection();
          }
        });
      }
    });
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
      docResult.save(`${new Date().toISOString()}_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }


}
