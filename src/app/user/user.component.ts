import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogUserComponent } from './dialoguser/dialoguser.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../services/exportexcel.service';
import { ApiUserService } from '../services/apiuser.service';
import { Users } from '../models/users';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiAuthService } from '../services/apiauth.service';
import { User } from '../models';
import { Router } from '@angular/router';
import { DialoginactiveuserComponent } from './dialoginactiveuser/dialoginactiveuser.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  title: string = "Usuarios";
  user !: User;
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' },
    { prop: 'pseudomyn', name: 'PSeudonimo' }];

  constructor(private api: ApiUserService, public apiAuth: ApiAuthService, private router: Router, private excel: ExportExcelService, public dialog: MatDialog, public Toasr: ToastrService) {
    this.apiAuth.user.subscribe(x => { if (x.privilege) { this.user = x } else { this.router.navigate(['/']); } });
  }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.api.readSuper().subscribe(x => {
      if (x.data == this.user.id) {
        this.api.readFull().subscribe(x => {
          this.rows = x.data;
          this.temp = this.rows;
        });
      }
      else {
        this.api.read().subscribe(x => {
          this.rows = x.data;
          this.temp = this.rows;
        });
      }
    });
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

  openCreate() {
    const dialogRef = this.dialog.open(DialogUserComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  delete(entity: Users) {
    const dialogRef = this.dialog.open(DialoginactiveuserComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.clearSelection();
  }

  clearSelection(): void {
    this.selected = [];
  }

  // openEdit(entity: Users)
  // {
  //   const dialogRef = this.dialog.open(DialogUserComponent, {data: entity});
  //   dialogRef.afterClosed().subscribe(finish => {this.read()});
  // }
  // delete(entity: Users) {
  //   const dialogRef = this.dialog.open(DialogDeleteComponent, { data: entity });
  //   dialogRef.afterClosed().subscribe(finish => {
  //     if (finish) {
  //       this.api.delete(entity.id).subscribe(result => {
  //         if (result.success === 1) {
  //           this.Toasr.warning('Registro Inactivado', 'MarketAlfaApp');
  //           this.read();
  //           this.clearSelection();
  //         }
  //       });
  //     }
  //   });
  // }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
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
      docResult.save(`Usuarios_MarketAlfa.pdf`);
    });
  }
}
