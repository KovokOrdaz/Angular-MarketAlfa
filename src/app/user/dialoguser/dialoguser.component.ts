import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/models/users';
import { ApiCategoryService } from 'src/app/services/apicategory.service';
import { ApiMeasureService } from 'src/app/services/apimeasure.service';
import { ApiUserService } from 'src/app/services/apiuser.service';

@Component({
  selector: 'app-dialoguser',
  templateUrl: './dialoguser.component.html',
  styleUrls: ['./dialoguser.component.scss']
})
export class DialogUserComponent {

  public id: number = 0;
  public name: string = "";
  public ls: number = 0;
  public rif: string = "";
  public phone: string = "";
  public direction: string = "";
  public status: boolean = true;
  public nameUser: string = "";
  public pseudomyn: string = "";
  public mail: string = "";
  public password: string = "";
  public privilege: boolean = false;
  public question: string = "";
  public answer: string = "";
  public coin: string = "";
  public acronym: string = "";
  public salt: string = "";
  public listPseudo: any[] = [];

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>, public api: ApiUserService, public apiCategory: ApiCategoryService, public apiMeasure: ApiMeasureService, private Toastr: ToastrService) {
    this.api.readPseudomyn().subscribe(x => { this.listPseudo = x.data; console.log(this.listPseudo) });
  }

  nameValidation(): void {
    if (this.name.length < 6) {
      this.Toastr.warning("El Nombre debe llevar al menos 6 Caracteres", "MarketAlfaApp");
    }
  }

  pseudomynValidation(): void {
    if (this.pseudomyn.length < 6) {
      this.Toastr.warning("El Pseudónimo debe llevar al menos 6 Caracteres", "MarketAlfaApp");
    }
    else {
      if (this.listPseudo.includes(this.pseudomyn)) {
        this.Toastr.warning("Pseudónimo Ocupado", "MarketAlfaApp");
      }
    }
  }

  passwordValidation(): void {
    var REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (!this.password.match(REGEX)) {
      this.Toastr.warning("La Contraseña debe tener al Menos 8 caracteres, 1 Mayúscula, 1 Minúscula y 1 Especial (Sin Espacios)", "MarketAlfaApp");
    }
  }

  questionValidation(): void {
    if (this.question.length < 9) {
      this.Toastr.warning("La Pregunta de Seguridad debe tener al Menos 10 caracteres", "MarketAlfaApp");
    }
  }

  answerValidation(): void {
    if (this.answer.length < 3) {
      this.Toastr.warning("La Respuesta debe tener al Menos 3 caracteres", "MarketAlfaApp");
    }
  }

  close() { this.dialogRef.close() }

  create() {
    const user: Users = { id: this.id, name: this.name, pseudomyn: this.pseudomyn, password: this.password, privilege: this.privilege, status: true, salt: this.salt, question: this.question, answer: this.answer };
    var REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (this.listPseudo.includes(this.pseudomyn)) {
      this.Toastr.warning("Pseudónimo Ocupado", "MarketAlfaApp");
    }
    else {
      if (this.password.match(REGEX)) {
        if (this.name.length > 5 && this.pseudomyn.length > 5 && this.password.length > 7 && this.question.length > 9 && this.answer.length > 3) {
          console.log(user);
          this.api.create(user).subscribe(result => {
            if (result.success === 1) {
              this.dialogRef.close();
              this.Toastr.success("Usuario Registrado Satisfactoriamente", "MarketAlfaApp");
            }
            else {
              this.Toastr.warning("Ha ocurrido un error", "MarketAlfaApp");
            }
          });
        }
        else {
          this.Toastr.warning("Llene Correctamente los campos", "MarketAlfaApp");
          this.nameValidation();
          this.pseudomynValidation();
          this.passwordValidation();
          this.questionValidation();
          this.answerValidation();
        }
      }
      else {
        this.Toastr.warning("La Contraseña debe tener al Menos 8 caracteres, 1 Mayúscula, 1 Minúscula y 1 Especial (Sin Espacios)", "MarketAlfaApp");
      }
    }
  }
}
