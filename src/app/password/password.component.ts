import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserChangePassword } from '../models/userChangePassword';
import { ApipasswordService } from '../services/apipassword.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  public password: string = "";
  public confirmPassword: string = "";
  public user: number;
  constructor(public dialogRef: MatDialogRef<PasswordComponent>,private api:ApipasswordService, private Toastr: ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public id: number)
  {
    this.user = id;
  }

  ngOnInit(): void 
  {
  }

  close(){this.dialogRef.close()}

  change()
  {
    var REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (this.password.match(REGEX))
    {
      console.log(this.password);
      console.log(this.confirmPassword);
      if(this.password === this.confirmPassword)
      {
        const entity: UserChangePassword = {id: this.id, password:this.password};
        this.api.change(entity).subscribe(result => {
          if (result.success === 1)
          {
              this.dialogRef.close();
              this.Toastr.success("Contraseña Cambianda","MarketAlfa");
              this.router.navigate(['/']);
          }
          else
          {
            this.Toastr.warning("Ha ocurido un error al cambiar la contraseña","MarketAlfa");
            console.log(result.message);
          }
        });
      }
      else
      {
        this.Toastr.info("Las Contraseñas deben ser Iguales","MarketAlfa");
      }
    }
    else
    {
      this.Toastr.info("La Contraseña debe tener al Menos 8 caracteres, 1 Mayuscula, 1 Minuscula y 1 Especial (Sin Espacios)","MarketAlfa");
    }
  }
}
