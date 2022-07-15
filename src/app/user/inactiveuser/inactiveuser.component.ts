import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogUserComponent } from '../dialoguser/dialoguser.component';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../../services/exportexcel.service';
import { Users } from '../../models/users';
import { ApiUserInactiveService } from 'src/app/services/apiuserinactive.service';
import { DialogRescueComponent } from 'src/app/common/rescue/dialogrescue.component';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-inactiveuser',
  templateUrl: './inactiveuser.component.html',
  styleUrls: ['./inactiveuser.component.scss']
})
export class InactiveuserComponent implements OnInit {
  title: string = "Usuario Inactivos";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'banned', name: 'PSeudonimo' },
    { prop: 'reason', name: 'Motivo o Razón' },
    { prop: 'user', name: 'Inhabilitado Por' },
    { prop: 'date', name: 'Fecha' },];

  constructor(private api: ApiUserInactiveService, private excel: ExportExcelService, public dialog: MatDialog, public Toasr: ToastrService) { }

  ngOnInit(): void {
    this.read();
  }

  read() {
    this.api.read().subscribe(x => {
      this.rows = x.data;
      this.temp = this.rows;
    });
  }

  clearSelection(): void {
    this.selected = [];
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

  // openEdit(entity: Users)
  // {
  //   const dialogRef = this.dialog.open(DialogUserComponent, {data: entity});
  //   dialogRef.afterClosed().subscribe(finish => {this.read()});
  // }

  delete(entity: Users) {
    const dialogRef = this.dialog.open(DialogRescueComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => {
      if (finish) {
        this.api.delete(entity.id).subscribe(result => {
          if (result.success === 1) {
            this.Toasr.success('Registro Activado', 'MarketAlfaApp');
            this.read();
            this.clearSelection();
          }
        });
      }
    });
  }

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
      docResult.save(`UsuariosInactivos_MarketAlfa.pdf`);
    });
  }
}
