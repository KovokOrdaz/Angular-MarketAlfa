import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Business } from 'src/app/models/business';
import { ApiBusinessService } from 'src/app/services/apibusiness.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';
import { ApiresquestService } from 'src/app/services/apiresquest.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialogshowrequest',
  templateUrl: './dialogshowrequest.component.html',
  styleUrls: ['./dialogshowrequest.component.scss']
})
export class DialogshowrequestComponent implements OnInit {

  data: any= [];
  public business: Business;
  public listProduct: any[] = [];
  public coin: string = "";
  public priceTotal: number = 0;
  constructor(public dialogRef: MatDialogRef<DialogshowrequestComponent>, public apiBusiness: ApiBusinessService, public api: ApiresquestService, public apiProduct: ApiProductService, @Inject(MAT_DIALOG_DATA) public code: number, @Inject(MAT_DIALOG_DATA) public distributor: string, @Inject(MAT_DIALOG_DATA) public receive: string, @Inject(MAT_DIALOG_DATA) public id: number)
  {
    this.apiBusiness.read().subscribe(x => { this.business = x.data; this.coin =x.data.acronym });
    this.apiProduct.read().subscribe(x=>{ this.listProduct= x.data;});
  }

  ngOnInit(): void 
  {
    this.api.detail(this.id).subscribe(x=>{ this.data = x.data; console.log(x.data); this.getTotal();});
  }

  close() { this.dialogRef.close() }

getTotal():void
{
  console.log('hello world');
  var total: number = 0;
  this.data.forEach(function(value){total = total + (value.amount * value.price); console.log(total)});
  this.priceTotal = total;
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
    docResult.save('Pedido#'+this.id+'_MarketAlfa.pdf');
  });
}

}
