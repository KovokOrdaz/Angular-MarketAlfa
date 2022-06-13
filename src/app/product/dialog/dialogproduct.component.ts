import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Academic } from 'src/app/models/academic';
import { Product } from 'src/app/models/product';
import { ApiAcademicService } from 'src/app/services/apiacademic.service';
import { ApiProductService } from 'src/app/services/apiproduct.service';

@Component({ templateUrl:'dialogproduct.component.html' })
export class DialogProductComponent
{
    public id: number = 0;
    public code: string = "";
    public name: string = "";
    public category: number = 0;
    public description: number = 0;
    public isComplete: number = 0;

    constructor(public dialogRef: MatDialogRef<DialogProductComponent>, public api: ApiProductService, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public entity: Product)
    {
        if(entity !== null)
        {
            this.id = entity.id; 
            this.code = entity.code;
            this.name = entity.name;
            this.category = entity.category;
            this.description = entity.description;
            this.isComplete = entity.isComplete;
        }
    }
    
    close(){this.dialogRef.close()}

    create()
    {
        //const product: Product = { id: this.id, code: this.code, name: this.name, category: this.category, isComplete: this.isComplete,}
        // this.api.create(product).subscribe(result => 
        //     { 
        //         if(result.success === 1)
        //         { 
        //             this.dialogRef.close();
        //             this.snackBar.open('Registro Academico Editado', '', {duration: 2000});
        //         }
        //     });
    }

    update()
    {
        // const product: Product = { id: this.id, code: this.code, name: this.name, category: this.category, isComplete: this.isComplete,}
        // this.api.update(product).subscribe(result => 
        //     { 
        //         if(result.success === 1)
        //         { 
        //             this.dialogRef.close();
        //             this.snackBar.open('Registro Academico Correcto', '', {duration: 2000});
        //         }
        //     });
    }
}