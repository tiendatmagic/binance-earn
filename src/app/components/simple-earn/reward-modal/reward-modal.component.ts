import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reward-modal',
  templateUrl: './reward-modal.component.html',
  styleUrl: './reward-modal.component.scss'
})
export class RewardModalComponent {
  datas: any = [];
  reward: number = 0;
  constructor(public dialogRef: MatDialogRef<RewardModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.datas = this.data;
    this.reward = this.datas.reward;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
