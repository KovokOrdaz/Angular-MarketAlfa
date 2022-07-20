import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiOrderService } from 'src/app/services/apiorder.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dialogshow',
  templateUrl: './dialogshow.component.html',
  styleUrls: ['./dialogshow.component.scss']
})
export class DialogshowComponent implements OnInit {

  data: any= [];
  constructor(public dialogRef: MatDialogRef<DialogshowComponent>, public api: ApiOrderService, @Inject(MAT_DIALOG_DATA) public code: number, @Inject(MAT_DIALOG_DATA) public distributor: string, @Inject(MAT_DIALOG_DATA) public receive: string)
  {
    
  }

  ngOnInit(): void 
  {
    console.log(this.code);
    this.api.detail(this.code).subscribe(x=>{ this.data = x.data; console.log(x.data)}); 
  }

  close() { this.dialogRef.close() }

  createPDF()
  {
    const DATA = document.getElementById('tableShowPDF');
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
}
