import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ApiinventoryService } from 'src/app/services/apiinventory.service';
import { ExportExcelService } from 'src/app/services/exportexcel.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApilotService } from 'src/app/services/apilot.service';

@Component({
  selector: 'app-retreat',
  templateUrl: './retreat.component.html'
})
export class RetreatComponent implements OnInit {

  title: string = "Productos Retirados";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    { prop: 'category', name: 'Categoría' },
    { prop: 'code', name: 'Código' },
    { prop: 'amount', name: 'Cantidad' },
    { prop: 'lot', name: 'Lote' },
    { prop: 'date', name: 'Fecha' },
    { prop: 'reason', name: 'Razón o Motivo' },
    { prop: 'user', name: 'Por' }
  ];

  constructor(public api: ApilotService, private excel: ExportExcelService, public Toastr: ToastrService) { }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.api.readProductReason().subscribe(x => { console.log(x.data); this.rows = x.data; this.temp = this.rows; });
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
      docResult.save(`Productos_Retirados_MarketAlfa.pdf`);
    });
  }

  clearSelection(): void {
    this.selected = [];
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}

