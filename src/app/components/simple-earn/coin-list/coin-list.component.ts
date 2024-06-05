import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleEarnRegisterModalComponent } from '../../simple-earn-register-modal/simple-earn-register-modal.component';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss'
})
export class CoinListComponent {


  constructor(public dialog: MatDialog) {
  }
  openRegister() {
    this.dialog.closeAll();
    this.dialog.open(SimpleEarnRegisterModalComponent, {
      width: '90%',
      maxWidth: '500px',
    });
  }
}
