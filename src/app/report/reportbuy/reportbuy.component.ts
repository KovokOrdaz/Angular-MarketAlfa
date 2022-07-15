import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportExcelService } from 'src/app/services/exportexcel.service';
import { ApibuyService } from 'src/app/services/apibuy.service';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { series } from 'src/app/models/series';

@Component({
  selector: 'app-reportbuy',
  templateUrl: './reportbuy.component.html',
  styleUrls: ['./reportbuy.component.scss']
})

export class ReportbuyComponent implements OnInit {
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  public date: string = "";
  public count: string = "";
  public averagePrice: string = "";
  public averageProfit: string = "";
  public totalAmount: string = "";
  public totalPrice: string = "";
  public totalProfit: string = "";
  public coin: string = "";

  columns: any[] = [
    { prop: 'date', name: 'Fecha' },
    { prop: 'averagePrice', name: 'Precio Promedio' },
    { prop: 'averageProfit', name: 'Ganancia Promedio' },
    { prop: 'totalAmount', name: 'Producto Vendido' },
    { prop: 'totalPrice', name: 'Ganancia Bruta' },
    { prop: 'totalProfit', name: 'Ganancia Neta' }];

  constructor(private api: ApibuyService, public apiBusiness: ApiBusinessService, private excel: ExportExcelService) { }

  ngOnInit(): void {
    this.api.reportBuy().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
      this.date = this.rows[0].date;
      this.count = this.rows[0].countB;
      this.averagePrice = this.rows[0].averagePrice;
      this.averageProfit = this.rows[0].averageProfit;
      this.totalAmount = this.rows[0].totalAmount;
      this.totalPrice = this.rows[0].totalPrice;
      this.totalProfit = this.rows[0].totalProfit;
    });
    this.apiBusiness.read().subscribe(x => { this.coin = x.data.acronym });
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
    const temp = this.temp.filter(function (d: { date: string; }) {
      return d.date.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  createPDF() {
    const DATA = document.getElementById('cardPDF');
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
      docResult.save("Ventas_Del_" + this.selected.date + "_MarketAlfa.pdf");
    });
  }

  createExcel(): void {
    this.excel.create(this.selected, "Ventas_Del_" + this.selected.date);
  }

  clearSelection(): void {
    this.selected = [];
  }
}
