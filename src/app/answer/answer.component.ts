import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnswerQuestionChange } from '../models/answerQuestionChange';
import { ApipasswordService } from '../services/apipassword.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit {
  public answer: string;
  public question: string;

  // public answerForm = this.formBuilder.group(
  //   {
  //       answer: ['', Validators.required, Validators.minLength(10)],
  //       question: ['', Validators.required, Validators.minLength(3)]
  //   });

  constructor(public dialogRef: MatDialogRef<AnswerComponent>, private api:ApipasswordService, public formBuilder: FormBuilder, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public id: number) 
  {
  }

  ngOnInit(): void 
  {
  }

  save()
  {
    const entity: AnswerQuestionChange = {id: this.id, answer:this.answer, question: this.question};
    this.api.changeAnswer(entity).subscribe(result => {
      if (result.success === 1)
      {
          this.dialogRef.close();
          this.Toastr.success("Pregunta de Segurida Cambiada","MarketAlfa");
      }
      else
      {
        this.Toastr.warning("Ha ocurido un error al cambiar la contraseña","MarketAlfa");
        console.log(result.message);
      }
    });
  }

  close(){this.dialogRef.close()}
}
