import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models';
import { ApiAuthService } from '../services/apiauth.service';
import { ApilotService } from '../services/apilot.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DialoginactivelotComponent } from './dialoginactivelot/dialoginactivelot.component';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html'
})
export class LotComponent implements OnInit {
  title: string = "Lotes";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [];

  user!: User;
  constructor(private api: ApilotService, public apiAuth: ApiAuthService, public dialog: MatDialog, private router: Router, public Toastr: ToastrService) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
  }

  ngOnInit(): void {
    this.api.read().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
    });
    this.columns = [
      { prop: 'name', name: 'Nombre' },
      { prop: 'code', name: 'Código' },
      { prop: 'category', name: 'Categoría' },
      { prop: 'lot', name: 'Lote' },
      { prop: 'date', name: 'Entrada' },
      { prop: 'amount', name: 'Cantidad' },
      { prop: 'sold', name: 'Vendido' },
      { prop: 'registeredBy', name: 'Registrado Por ' },
      { prop: 'expiration', name: 'Expiración' }];
  }
  read(): void {
    this.api.read().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
    });
    this.columns = [
      { prop: 'name', name: 'Nombre' },
      { prop: 'code', name: 'Código' },
      { prop: 'category', name: 'Categoría' },
      { prop: 'lot', name: 'Lote' },
      { prop: 'date', name: 'Entrada' },
      { prop: 'amount', name: 'Cantidad' },
      { prop: 'sold', name: 'Vendido' },
      { prop: 'registeredBy', name: 'Registrado Por ' },
      { prop: 'expiration', name: 'Expiración' }];
  }

  clearSelection(): void {
    this.selected = [];
  }

  delete(entity: any) {
    const dialogRef = this.dialog.open(DialoginactivelotComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
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
      docResult.save(`Lotes_MarketAlfa.pdf`);
    });
  }
}
