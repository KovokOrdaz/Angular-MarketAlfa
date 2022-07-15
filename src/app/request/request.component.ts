import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../services/exportexcel.service';
import { ApiresquestService } from '../services/apiresquest.service';
import { User } from '../models';
import { Router } from '@angular/router';
import { ApiAuthService } from '../services/apiauth.service';
import { DialogshowrequestComponent } from './dialogshowrequest/dialogshowrequest.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  title: string = "Pedidos Recibidos";
  user !: User;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  date: Date;

  columns: any[] = [
    { prop: 'distributor', name: 'Proveedor' },
    { prop: 'id', name: '#' },
    { prop: 'code', name: 'Factura' },
    { prop: 'receive', name: 'Recibido' },
    { prop: 'receivedBy', name: 'Por' }
  ];
  constructor(private api: ApiresquestService, public apiAuth: ApiAuthService, private excel: ExportExcelService, public dialog: MatDialog, private router: Router, public snackBar: MatSnackBar) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
  }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.api.getRead().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
    });
  }

  show(id: number, distributor: string, receive: string, code: number) {
    const dialogRef = this.dialog.open(DialogshowrequestComponent, { minWidth: "640px" });
    dialogRef.componentInstance.distributor = distributor;
    dialogRef.componentInstance.receive = receive;
    dialogRef.componentInstance.code = code;
    dialogRef.componentInstance.id = id;
    this.clearSelection();
  }

  clearSelection(): void {
    this.selected = [];
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
      docResult.save(`PedidoRecibidos_MarketAlfa.pdf`);
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
    const temp = this.temp.filter(function (d: { distributor: string; }) {
      return d.distributor.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}
