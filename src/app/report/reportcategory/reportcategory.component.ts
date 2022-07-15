import { Component, OnInit, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApibuyService } from 'src/app/services/apibuy.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';

@Component({
  selector: 'app-reportcategory',
  templateUrl: './reportcategory.component.html',
  styleUrls: ['./reportcategory.component.scss']
})
export class ReportcategoryComponent implements OnInit {

  single: any[] = [{
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
  {
    "name": "UK",
    "value": 6200000
  }];
  view: [number, number] = [540, 400];

  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  public legendPosition: LegendPosition = LegendPosition.Below;

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    // { prop: 'code', name: 'Código' },
    { prop: 'countB', name: 'Ventas' },
    { prop: 'totalAmount', name: 'Cantidad' },
    //{ prop: 'averagePrice', name: 'Precio Promedio' },
    // { prop: 'averageAmount', name: 'Venta Promedio' },
    { prop: 'totalPrice', name: 'Ganancia Total' },
    { prop: 'totalProfit', name: 'Ganancia Neta' }
  ];

  business: any = [];
  coin: string = "";

  constructor(private api: ApibuyService, public apiBusiness: ApiBusinessService) {
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin = x.data.coin });
    this.api.reportCategory().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
      this.single = [];
      for (let i = 0; i < this.rows.length; i++) {
        this.single.push({ name: this.rows[i].name + " (" + this.business.acronym + ")", value: this.rows[i].totalPrice });
      }
      console.log(this.rows);
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
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
      docResult.save("Grafica_Categoria_MarketAlfa.pdf");
    });
  }

}
