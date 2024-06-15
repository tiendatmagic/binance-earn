import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleEarnRegisterModalComponent } from '../../simple-earn-register-modal/simple-earn-register-modal.component';
import { EarnService } from '../../../services/earn.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss'
})
export class CoinListComponent {


  constructor(public dialog: MatDialog, private earnService: EarnService) {
  }
  openRegister() {
    this.dialog.closeAll();
    if (this.earnService.myAddress && this.earnService.myAddress.address && this.earnService.myAddress.address.length == 42) {
      this.dialog.open(SimpleEarnRegisterModalComponent, {
        disableClose: true,
        width: '90%',
        maxWidth: '722px',
      });
    }
    else {
      this.earnService.showModal("", "Bạn chưa nhập địa chỉ ví để tham gia", "error", true);
    }
  }
}
