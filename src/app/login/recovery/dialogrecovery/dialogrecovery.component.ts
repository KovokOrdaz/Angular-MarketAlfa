import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuestionAnswer } from 'src/app/models/questionAnswer';
import { PasswordComponent } from 'src/app/password/password.component';

@Component({
  selector: 'app-dialogrecovery',
  templateUrl: './dialogrecovery.component.html'
})
export class DialogrecoveryComponent implements OnInit {
  public question: string;
  private answerQuestion: string;
  public answer: string;
  public user: number;

  constructor(public dialogRef: MatDialogRef<DialogrecoveryComponent>, public dialog: MatDialog, private Toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public entity: QuestionAnswer) 
  {
    this.question = entity.question;
    this.answerQuestion = entity.answer;
    this.user = entity.id;
  }

  ngOnInit(): void {
  }

  close() { this.dialogRef.close() }

  check()
  {
    if(this.answerQuestion == this.answer)
    {
      this.Toastr.success('La Respuesta es Correcta','MarketAlfaApp');
      this.dialogRef.close();
      this.dialog.open(PasswordComponent, {data: this.user});
    }
    else
    {
      this.Toastr.error('La Respuesta No Coincide','MarketAlfaApp');
    }
  }

}
