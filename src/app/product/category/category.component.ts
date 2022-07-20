import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../models/category';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ExportExcelService } from '../../services/exportexcel.service';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { DialogCategoryComponent } from './dialogcategory/dialogcategory.component';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  title: string = "Categorías Productos";
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  rows: any[] = [];
  temp: any[] = [];
  selected: any = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  columns: any[] = [
    { prop: 'name', name: 'Nombre' }];

  constructor(private api: ApiCategoryService, public Toastr: ToastrService, private excel: ExportExcelService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.read();
  }

  clearSelection(): void {
    this.selected = [];
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
    const dialogRef = this.dialog.open(DialogCategoryComponent);
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  openEdit(entity: Category) {
    const dialogRef = this.dialog.open(DialogCategoryComponent, { data: entity });
    dialogRef.afterClosed().subscribe(finish => { this.read() });
    this.selected = [];
  }

  delete(entity: Category) {
    this.api.delete(entity.id).subscribe(result => {
      if (result.success === 1) {
        if (entity.status) {
          this.Toastr.warning("Registro Desactivado", "MarketAlfaApp");
        }
        else {
          this.Toastr.success("Registro Activado", "MarketAlfaApp");
        }
        this.read();
        this.selected = [];
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
      docResult.save(`Categoria_MarketAlfa.pdf`);
    });
  }

  createExcel(): void {
    this.excel.create(this.temp, this.title);
  }

}
