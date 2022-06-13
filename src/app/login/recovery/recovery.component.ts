import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['../login.component.scss']
})
export class RecoveryComponent implements OnInit {
  disableNumber = new FormControl(false);
  disableSecurity = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
  }

}
