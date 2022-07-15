import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../../services/exportexcel.service';
import { Client, User } from '../../models';
import { ApiClientInactiveService } from 'src/app/services/apiclientinactive.service';
import { DialogRescueComponent } from 'src/app/common/rescue/dialogrescue.component';
import { ApiAuthService } from 'src/app/services/apiauth.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './clientinactive.component.html'
})
export class ClientInactiveComponent implements OnInit {
  title: string = "Clientes Inactivos";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected:any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  user !: User;

  columns: any[] = [
    { prop: 'name', name:'Nombre' }, 
    { prop: 'nationality', name: 'Nacionalidad' }, 
    { prop: 'dni', name: 'Cedula o Pasaporte'},
    { prop: 'user', name: 'Registrado por'},
    { prop: 'date', name: 'Fecha'}];
  
  constructor(private api: ApiClientInactiveService, public apiAuth: ApiAuthService, private router: Router, private excel:ExportExcelService, public dialog: MatDialog, public Toastr: ToastrService)
  {
    this.apiAuth.user.subscribe(x => { if(x.privilege){ this.user = x} else { this.router.navigate(['/']); } });
  }

  ngOnInit(): void 
  {
    this.read();
  }

  read()
  {
    this.api.read().subscribe(x=>{ this.rows = x.data;
      this.temp = this.rows;});
  }

  onSelect({ }) {
    console.log('Select Event', this.selected, this.selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  updateFilter(event:any) {
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

  delete(entity: Client)
  {
    const dialogRef = this.dialog.open(DialogRescueComponent, {data: entity});
    dialogRef.afterClosed().subscribe(finish => 
      {
        if(finish)
        {
          this.api.delete(entity.dni).subscribe(result => 
            {
              if(result.success === 1)
              {
                this.Toastr.success("Cliente Activado","MarketAlfaApp");
                this.read();
                this.selected = [];
              }
            });
        }
      });
  }

  createPDF()
  {
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
      docResult.save(`ClientesInactivos_MarketAlfa.pdf`);
    });
  }

  createExcel():void
  {
    this.excel.create(this.temp, this.title);
  }

}