import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';
import { ApiAuthService } from '../services/apiauth.service';
import { ApibuyService } from '../services/apibuy.service';
import { ExportExcelService } from '../services/exportexcel.service';
import { DialogbuyComponent } from './dialogbuy/dialogbuy.component';
import { DialogshowbuyComponent } from './dialogshowbuy/dialogshowbuy.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  title: string = "Ventas";
  user !: User;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [];

  constructor(private api: ApibuyService, public apiAuth: ApiAuthService, private excel: ExportExcelService, public dialog: MatDialog, private router: Router, public Toastr: ToastrService) { }
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
          { prop: 'id', name: '#' },
          { prop: 'client', name: 'Cliente' },
          { prop: 'date', name: 'Fecha' },
          { prop: 'seller', name: 'Vendedor' }];
      }
      else {
        this.api.readUser(x.id).subscribe(x => {
          this.rows = x.data;
          this.temp = this.rows;
        });
        this.columns = [
          { prop: 'id', name: '#' },
          { prop: 'client', name: 'Cliente' },
          { prop: 'date', name: 'Fecha' }];
      }
    });
  }

  show(id: number, client: string, receive: string) {
    const dialogRef = this.dialog.open(DialogshowbuyComponent, { minWidth: "680px" });
    dialogRef.componentInstance.client = client;
    dialogRef.componentInstance.receive = receive;
    dialogRef.componentInstance.id = id;
  }

  clearSelection(): void {
    this.selected = [];
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
    const temp = this.temp.filter(function (d: { client: string; }) {
      return d.client.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  openCreate() {
    const dialogRef = this.dialog.open(DialogbuyComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
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
      docResult.save(`Ventas_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }
}
