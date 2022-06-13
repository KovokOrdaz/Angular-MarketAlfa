import { Component, OnInit } from '@angular/core';
import { Academic } from 'src/app/models';
import { ApiAcademicService } from 'src/app/services/apiacademic.service';
import { DialogAcademicComponent } from './dialog/dialogacademic.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {

  public lst: any[] = [];
  public display: string[] = ['id', 'employee', 'grade', 'title', 'options'];
  readonly width: string = '300px';
  
  constructor(private api: ApiAcademicService, public dialog: MatDialog, public snackBar: MatSnackBar){}

  ngOnInit(): void 
  {
    this.read();
  }

  read()
  {
    this.api.read().subscribe(result => {this.lst = result.data });
  }

  openCreate()
  {
    const dialogRef = this.dialog.open(DialogAcademicComponent, {width: this.width});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }
  
  openEdit(entity: Academic)
  {
    const dialogRef = this.dialog.open(DialogAcademicComponent, {width: this.width, data: entity});
    dialogRef.afterClosed().subscribe(finish => {this.read()});
  }

  delete(entity: Academic)
  {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {width: this.width, data: entity});
    dialogRef.afterClosed().subscribe(finish => 
      {
        if(finish)
        {
          this.api.delete(entity.id).subscribe(result => 
            {
              if(result.success === 1)
              {
                this.snackBar.open('Registro Academico Eliminado Correctamente','',{duration: 2000});
                this.read();
              }
            });
        }
      });
  }

}
