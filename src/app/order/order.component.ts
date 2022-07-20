import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { Product } from '../models/product';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../services/exportexcel.service';
import { ApiOrderService } from '../services/apiorder.service';
import { DialogorderComponent } from './dialogorder/dialogorder.component';
import { DialogorderdetailComponent } from './dialogorderdetail/dialogorderdetail.component';
import { OrderX } from '../models/orderX';
import { ApiresquestService } from '../services/apiresquest.service';
import { DialogshowComponent } from './dialogshow/dialogshow.component';
import { DialogdeliveridComponent } from './dialogdeliverid/dialogdeliverid.component';
import { User } from '../models';
import { Router } from '@angular/router';
import { ApiAuthService } from '../services/apiauth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})

export class OrderComponent implements OnInit {
  title: string = "Pedidos";
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
    { prop: 'date', name: 'Fecha de Emisión' },
    { prop: 'receive', name: 'Fecha de Llegada' },
    { prop: 'user', name: 'Emitido Por' }];

  constructor(private api: ApiOrderService, public apiAuth: ApiAuthService, private apiResquest: ApiresquestService, private excel: ExportExcelService, public dialog: MatDialog, private router: Router, public Toastr: ToastrService) {
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

  show(id: number, distributor: string, receive: string) {
    this.clearSelection();
    const dialogRef = this.dialog.open(DialogshowComponent, { width: '600px' });
    dialogRef.componentInstance.distributor = distributor;
    dialogRef.componentInstance.receive = receive;
    dialogRef.componentInstance.code = id;
  }

  clearSelection(): void {
    this.selected = [];
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


  openCreate() {
    const dialogRef = this.dialog.open(DialogorderComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  openDetail() {
    const dialogRef = this.dialog.open(DialogorderdetailComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  openDeliverid(entity: OrderX) {
    const dialogRef = this.dialog.open(DialogdeliveridComponent, {
      data: entity, maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  openEdit(entity: OrderX) {
    const dialogRef = this.dialog.open(DialogorderComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  delete(entity: OrderX) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => {
      if (finish) {
        this.api.delete(entity.id).subscribe(result => {
          if (result.success === 1) {
            this.Toastr.warning("Orden Desactivada", "MarketAlfaApp");
            this.read();
            this.selected = [];
          }
        });
      }
    });
    this.selected = [];
  }

  RequestS(_entity: OrderX) {
    // const entity: RequestX = { id: _entity.id, orderD: _entity.id, distributor: _entity.distributor, receive: this.date}
    // console.log(entity);
    // this.apiResquest.create(entity).subscribe(result =>
    //   {
    //     if(result.success === 1)
    //     {
    //       this.snackBar.open('Registro Correcto','',{duration: 2000});
    //       this.read();
    //     }
    //     else
    //     {
    //       console.log(result.data);
    //     }
    //   });
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
      docResult.save(`OrdenesActivas_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}
