import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Academic } from 'src/app/models/academic';
import { ApiAcademicService } from 'src/app/services/apiacademic.service';

@Component({ templateUrl:'dialogclient.component.html' })
export class DialogClientComponent
{
    // public id: number = 0;
    // public employee: number = 0;
    // public grade: number = 0;
    // public title: string = "";

    // // constructor(public dialogRef: MatDialogRef<DialogClientComponent>, public api: ApiacademicService, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public entity: Client)
    // // {
    // //     if(entity !== null)
    // //     {
    // //         this.id = entity.id; 
    // //         this.employee = entity.employee;
    // //         this.grade = entity.grade;
    // //         this.title = entity.title;
    // //     }
    // // }
    
    // // close(){this.dialogRef.close()}

    // create()
    // {
    //     const academic: Academic = { id: this.id, employee: this.employee, grade: this.grade, title: this.title}
    //     this.api.create(academic).subscribe(result => 
    //         { 
    //             if(result.success === 1)
    //             { 
    //                 this.dialogRef.close();
    //                 this.snackBar.open('Registro Academico Editado', '', {duration: 2000});
    //             }
    //         });
    // }

    // update()
    // {
    //     const academic: Academic = { id: this.id, employee: this.employee, grade: this.grade, title: this.title}
    //     this.api.update(academic).subscribe(result => 
    //         { 
    //             if(result.success === 1)
    //             { 
    //                 this.dialogRef.close();
    //                 this.snackBar.open('Registro Academico Correcto', '', {duration: 2000});
    //             }
    //         });
    // }
}