import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../../services/exportexcel.service';
import { ApiProductInactiveService } from 'src/app/services/apiproductinactive.service';
import { DialogRescueComponent } from 'src/app/common/rescue/dialogrescue.component';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-inactiveproduct',
  templateUrl: './inactiveproduct.component.html',
  styleUrls: ['./inactiveproduct.component.scss']
})
export class InactiveProductComponent implements OnInit {

  title: string = "Productos Inactivos";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: Product[] = [];
  temp: Product[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    { prop: 'code', name: 'Código' },
    { prop: 'reason', name: 'Motivo O Razón' },
    { prop: 'date', name: 'Fecha de Inhabilitación' },
    { prop: 'user', name: 'Por' }
  ];

  constructor(private api: ApiProductInactiveService, private excel: ExportExcelService, public dialog: MatDialog, public Toastr: ToastrService) { }

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

  delete(entity: any) {
    const dialogRef = this.dialog.open(DialogRescueComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => {
      if (finish) {
        this.api.delete(entity.id).subscribe(result => {
          if (result.success === 1) {
            this.Toastr.success('Registro Activado', 'MarketAlfaApp');
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
      docResult.save(`Productos_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }
}
