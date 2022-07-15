import { Component, OnInit } from '@angular/core';
import { ChartLineBuy } from 'src/app/models/chartLineBuy';
import { series } from 'src/app/models/series';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { ApibuyService } from 'src/app/services/apibuy.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-buyweek',
  templateUrl: './buyweek.component.html',
  styleUrls: ['./buyweek.component.scss']
})
export class BuyweekComponent implements OnInit {
  rows: any[] = [];
  public count: number = 0;
  public averagePrice: number = 0;
  public averageProfit: number = 0;
  public totalAmount: number = 0;
  public totalPrice: number = 0;
  public totalProfit: number = 0;
  public coin: number = 0;
  serieAveregePrice: ChartLineBuy = {name: 'Venta Promedio', series: []};
  serieAveregeProfit: ChartLineBuy = {name: 'Ganancia Promedio', series: []};
  serieTotalPrice: ChartLineBuy = {name: 'Ganancia Bruta', series: []};
  serieTotalProfit: ChartLineBuy = {name: 'Ganancia Neta', series: []};
  public multi: ChartLineBuy[] = [];
  view: [number, number] = [1200, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dia';
  yAxisLabel: string = 'Venta';
  timeline: boolean = true;
  
  constructor(private api: ApibuyService, public apiBusiness: ApiBusinessService) { }

  ngOnInit(): void 
  {
    this.api.reportBuy().subscribe(x=>
      { 
        this.rows = x.data;
        for(let i = 0 ; i < 7 ; i++)
        {
          this.count = this.count + this.rows[i].countB;
  
          this.averagePrice = this.averagePrice + this.rows[i].averagePrice;
          var serieAvgPrice: series = {name: this.rows[i].date, value: this.rows[i].averagePrice};
          this.serieAveregePrice.series.push(serieAvgPrice);
  
          this.averageProfit = this.averageProfit  + this.rows[i].averageProfit;
          var serieAvgProfit: series = {name: this.rows[i].date, value: this.rows[i].averageProfit};
          this.serieAveregeProfit.series.push(serieAvgProfit);
  
          this.totalAmount = this.totalAmount + this.rows[i].totalAmount;
  
          this.totalPrice = this.totalPrice + this.rows[i].totalPrice;
          var serieTPrice: series = {name: this.rows[i].date, value: this.rows[i].totalPrice};
          this.serieTotalPrice.series.push(serieTPrice);
  
          this.totalProfit = this.totalProfit  + this.rows[i].totalProfit;
          var serieTProfit: series = {name: this.rows[i].date, value: this.rows[i].totalProfit};
          this.serieTotalProfit.series.push(serieTProfit);
          this.multi =[];
          this.multi.push(this.serieAveregePrice);
          this.multi.push(this.serieAveregeProfit);
          this.multi.push(this.serieTotalPrice);
          this.multi.push(this.serieTotalProfit);
          console.log(this.multi);
        }
        
      });

      this.apiBusiness.read().subscribe(x => { this.coin = x.data.acronym });
  }

  createPDF()
  {
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
      docResult.save("Ventas_De_LA_Semana_MarketAlfa.pdf");
    });
  }

  onSelectChart(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivateChart(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivateChart(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
