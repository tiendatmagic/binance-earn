import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EarnService } from '../../services/earn.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-simple-earn-register-modal',
  templateUrl: './simple-earn-register-modal.component.html',
  styleUrl: './simple-earn-register-modal.component.scss'
})
export class SimpleEarnRegisterModalComponent {
  showTab: number = 1;
  selectEarnRegister: any = 1;
  myBalance = 0;
  isInsufficientBalance = false;
  isProcess = false;
  isCompleted = false;
  canSelectEarnRegister = 0;
  isChangeSelect = false;
  isLoading = true;
  minimumBalance = 0;
  missionData: any = [
    {
      id: 1,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    },
    {
      id: 2,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    },
    {
      id: 3,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    },
    {
      id: 4,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    },
    {
      id: 5,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    },
    {
      id: 6,
      getMission:
      {
        nr1: false,
        nr2: false
      }
    }
  ]
  constructor(public dialogRef: MatDialogRef<SimpleEarnRegisterModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private earnService: EarnService, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isLoading = true;
    this.earnService.getMaxMission({ address: this.earnService.myAddress.address }).subscribe((res: any) => {
      var result = res['result'];
      if (result) {
        //
        if (result.mission + 1 <= 6) {
          this.selectEarnRegister = result.mission + 1;
        }

        if (this.selectEarnRegister > 6 || result.mission + 1 > 6) {
          this.earnService.showModal("", "Bạn đã hoàn thành hết nhiệm vụ rồi", "success", false);
        }
        this.isLoading = false;
        return;
      }
      else {
        this.selectEarnRegister = 1;
        this.isLoading = false;
      }
    },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      });

  }

  ngDoCheck() {
    this.myBalance = this.earnService.myAddress.balance;
  }
  onNoClick() {
    this.dialogRef.close();
  }

  changeSelectEarnRegister(nr: number) {
    this.isChangeSelect = true;

    if (this.canSelectEarnRegister == nr) {
      this.selectEarnRegister = nr;
      this.isChangeSelect = false;
      this.isProcess = false;
      this.isCompleted = false;
      //
    }

  }

  onShowTab(value: number) {
    this.showTab = value;
  }

  openLink(nr: number) {
    var link;
    switch (nr) {

      case 1:
        link = 'https://www.facebook.com/binance';
        break;
      case 2:
        link = 'https://www.facebook.com/binance/posts/pfbid02FgZGpYSWMbmR2dbpWTkvRZ63hC9ggtaN7UuHk1j6k3dVyNReBAsvgR16YNrySMWsl';
        break;
      case 3:
        link = 'https://www.facebook.com/binance/posts/pfbid0E2zvLRwsTt8JM5XW86Sn9t19PNGFxfSdUa1ytBM1dp736X75Z9WPRgmnCxhjrUtdl';
        break;
      //
      case 4:
        link = 'https://www.facebook.com/binance';
        break;
      case 5:
        link = 'https://www.facebook.com/binance/posts/pfbid02FgZGpYSWMbmR2dbpWTkvRZ63hC9ggtaN7UuHk1j6k3dVyNReBAsvgR16YNrySMWsl';
        break;
      case 6:
        link = 'https://www.facebook.com/binance/posts/pfbid0E2zvLRwsTt8JM5XW86Sn9t19PNGFxfSdUa1ytBM1dp736X75Z9WPRgmnCxhjrUtdl';
        break;
      default:
        break;
    }
    window.open(link, '_blank');

    setTimeout(() => {
      this.missionData[nr - 1].getMission.nr1 = true;
    }, 4000);

  }

  checkBalance(nr: number) {
    var balance = this.earnService.myAddress.balance;
    this.minimumBalance = 0;
    if (nr == 1) {
      this.minimumBalance = 1;
    }
    if (nr == 2) {
      this.minimumBalance = 10;
    }
    if (nr == 3) {
      this.minimumBalance = 100;
    }
    //
    if (nr == 4) {
      this.minimumBalance = 1;
    }
    if (nr == 5) {
      this.minimumBalance = 10;
    }
    if (nr == 6) {
      this.minimumBalance = 100;
    }

    if (balance < this.minimumBalance) {
      this.isInsufficientBalance = true;
      this.missionData[nr - 1].getMission.nr2 = false;
      setTimeout(() => {
        this.isInsufficientBalance = false;
      }, 5000);
    }
    else {
      this.missionData[nr - 1].getMission.nr2 = true;
    }
  }

  onProcess(nr: number) {
    this.isProcess = true;
    this.earnService.onRegisterAddress({ address: this.earnService.myAddress.address }).subscribe((res: any) => {
      var result = res['result'];
      if (result.status == 'success') {
        this.checkBalance(nr);
        var mission = this.missionData[nr - 1].getMission;
        if (mission.nr1 && mission.nr2) {
          // call api sau đó thì mới tắt popup

          //
          this.earnService.onPostMission(
            {
              address: this.earnService.myAddress.address,
              balance: this.earnService.myAddress.balance,
              mission: nr,
              useragent: this.deviceService.getDeviceInfo()
            }
          ).subscribe((res: any) => {
            var result = res['result'];
            if (result) {
              this.isProcess = false;
              this.isCompleted = true;
              this.canSelectEarnRegister = nr + 1;
            }
          },
            (error: any) => {
              this.isProcess = false;
              this.isCompleted = false;
            });
          //
        }
        else {
          this.isProcess = false;
        }
      }
    },
      (error: any) => {
        console.log(error);
        this.isProcess = false;
      });
  }
}
