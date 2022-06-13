import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { ApiEmployeeService } from 'src/app/services/apiemployee.service';

@Component({
  selector: 'app-dialogemployee',
  templateUrl: './dialogemployee.component.html',
  styleUrls: ['./dialogemployee.component.scss']
})
export class DialogEmployeeComponent implements OnInit {
  
  public id: number = 0;
    public name: string = '';
    public nationality: number = 0;
    public dni: string = '';
    public dateOfBirth: string = '';
    public phone: string = '';
    public socialSecurity: string = '';
    public job: string = '';
    public input: string = '';
    public output: string = '';
    public salary: number = 0;
    public datePay: number = 0;
    public status: boolean = true;
    public isUser: boolean = false;
    public date: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEmployeeComponent>, public api: ApiEmployeeService, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public entity: Employee) 
  {
    if(entity !== null)
    {
    this.id = entity.id;
    this.name = entity.name;
    //this.nationality = entity.nationality;
    this.dni = entity.dni;
    this.dateOfBirth = entity.dateOfBirth;
    this.phone = entity.phone;
    this.socialSecurity = entity.socialSecurity;
    this.job= entity.job;
    this.input= entity.input;
    this.output= entity.output;
    this.salary = entity.salary;
    this.datePay = entity.datePay;
    this.status = entity.status;
    this.isUser = entity.isUser;
    this.date= entity.date;
    }
  }

  ngOnInit(): void {
  }

}
