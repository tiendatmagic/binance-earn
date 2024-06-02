import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-earn-register-modal',
  templateUrl: './simple-earn-register-modal.component.html',
  styleUrl: './simple-earn-register-modal.component.scss'
})
export class SimpleEarnRegisterModalComponent {

  selectEarnRegister: string = 'flexible';
  constructor(public dialogRef: MatDialogRef<SimpleEarnRegisterModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick() {
    this.dialogRef.close();
  }

  changeSelectEarnRegister(value: string) {
    this.selectEarnRegister = value;
  }
}
