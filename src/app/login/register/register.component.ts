import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.scss']
})
export class RegisterComponent implements OnInit {
  disableNumber = new FormControl(false);
  disableSecurity = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
  }

}
