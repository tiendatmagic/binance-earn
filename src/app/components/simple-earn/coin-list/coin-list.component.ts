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
  mission: number = 0;

  constructor(public dialog: MatDialog, private earnService: EarnService) {
    this.earnService.myAddressAccount$.subscribe((value) => {
      this.mission = value.mission;
    });
  }
  openRegister(getMission: number = this.mission) {
    this.dialog.closeAll();
    if (this.earnService.myAddressAccount && this.earnService.myAddressAccount.address && this.earnService.myAddressAccount.address.length == 42) {
      this.dialog.open(SimpleEarnRegisterModalComponent, {
        disableClose: true,
        width: '90%',
        maxWidth: '500px',
        data: {
          mission: getMission
        }
      });
    }
    else {
      this.earnService.showModal("", "Bạn chưa nhập địa chỉ ví để tham gia", "error", true);
    }
  }
}
