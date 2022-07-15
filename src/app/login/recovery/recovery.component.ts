import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { QuestionAnswer } from 'src/app/models/questionAnswer';
import { UserRecovery } from 'src/app/models/userRecovery';
import { ApipasswordService } from 'src/app/services/apipassword.service';
import { DialogrecoveryComponent } from './dialogrecovery/dialogrecovery.component';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['../login.component.scss']
})
export class RecoveryComponent implements OnInit {
  public username: string;
  public name: string;
  constructor(public formBuilder: FormBuilder, private api: ApipasswordService, public dialog: MatDialog, private Toastr: ToastrService) { }
  ngOnInit(): void {
  }

  public recoveryForm = this.formBuilder.group(
    {
        name: ['', Validators.required],
        username: ['', Validators.required]
    });

    validUsername()
    {
      console.log(this.recoveryForm.value);
      this.api.read(this.recoveryForm.value).subscribe(x=> 
        {
          console.log(x);
            if(x.data != null)
            {
              this.Toastr.warning('Usuario Encontrado','MarketAlfaApp');
              this.openDialog(x.data);
            }
            else
            {
                this.Toastr.error('Usuario o Contraseña Incorrectos','MarketAlfaApp');
            }
        });
    }

    openDialog(entity: QuestionAnswer)
    {
      const dialogRef = this.dialog.open(DialogrecoveryComponent, {data: entity, disableClose: true});
    }

}
