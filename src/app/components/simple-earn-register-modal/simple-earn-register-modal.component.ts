import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EarnService } from '../../services/earn.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RewardModalComponent } from '../simple-earn/reward-modal/reward-modal.component';

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
  isRequired = false;
  getMission = 0;
  getLink: string = '';
  balanceMission = 0;
  rewardMission = 0;
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
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SimpleEarnRegisterModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private earnService: EarnService, private deviceService: DeviceDetectorService) {
    this.myBalance = this.earnService.myAddressAccount.balance;

    this.earnService.myAddressAccount$.subscribe((value) => {
      this.myBalance = parseFloat(value.balance);
    });
  }

  ngOnInit() {
    this.getMission = this.data.mission;
    this.isLoading = true;
    this.earnService.getMaxMission({ address: this.earnService.myAddressAccount.address }).subscribe((res: any) => {
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
        this.getMissionData();
        return;
      }
      else {
        this.selectEarnRegister = 1;
        this.isLoading = false;
        this.getMissionData();
      }
    },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      });
    //
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getMissionData() {
    // Sửa link và số dư của nhiệm vụ ở đây
    switch (this.selectEarnRegister) {
      case 1:
        this.getLink = 'https://www.facebook.com/binance';
        this.balanceMission = 1;
        this.rewardMission = 1;
        break;

      case 2:
        this.getLink = 'https://www.facebook.com/binance/posts/pfbid02FgZGpYSWMbmR2dbpWTkvRZ63hC9ggtaN7UuHk1j6k3dVyNReBAsvgR16YNrySMWsl';
        this.balanceMission = 10;
        this.rewardMission = 10;
        break;

      case 3:
        this.getLink = 'https://www.facebook.com/binance/posts/pfbid0E2zvLRwsTt8JM5XW86Sn9t19PNGFxfSdUa1ytBM1dp736X75Z9WPRgmnCxhjrUtdl';
        this.balanceMission = 100;
        this.rewardMission = 20;
        break;

      case 4:
        this.getLink = 'https://www.facebook.com/binance';
        this.balanceMission = 1;
        this.rewardMission = 1;
        break;

      case 5:
        this.getLink = 'https://www.facebook.com/binance/posts/pfbid02FgZGpYSWMbmR2dbpWTkvRZ63hC9ggtaN7UuHk1j6k3dVyNReBAsvgR16YNrySMWsl';
        this.balanceMission = 10;
        this.rewardMission = 10;
        break;

      case 6:
        this.getLink = 'https://www.facebook.com/binance/posts/pfbid0E2zvLRwsTt8JM5XW86Sn9t19PNGFxfSdUa1ytBM1dp736X75Z9WPRgmnCxhjrUtdl';
        this.balanceMission = 100;
        this.rewardMission = 20;
        break;

      default:
        break;
    }
  }

  changeSelectEarnRegister(nr: number) {
    this.isChangeSelect = true;
    this.isRequired = true;
    if (this.canSelectEarnRegister == nr) {
      this.selectEarnRegister = nr;
      this.isChangeSelect = false;
      this.isProcess = false;
      this.isCompleted = false;
      this.isRequired = false;
      //
      this.getMissionData();
    }

  }

  onShowTab(value: number) {
    this.showTab = value;
  }

  openLink(nr: number) {
    window.open(this.getLink, '_blank');

    setTimeout(() => {
      this.missionData[nr - 1].getMission.nr1 = true;
    }, 600);

  }

  checkBalance(nr: number) {
    var balance = this.earnService.myAddressAccount.balance;

    if (balance < this.balanceMission) {
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
    this.earnService.onRegisterAddress({ address: this.earnService.myAddressAccount.address }).subscribe((res: any) => {
      var result = res['result'];
      if (result.status == 'success') {
        this.checkBalance(nr);
        var mission = this.missionData[nr - 1].getMission;
        if (mission.nr1 && mission.nr2) {

          this.earnService.onPostMission(
            {
              address: this.earnService.myAddressAccount.address,
              balance: this.earnService.myAddressAccount.balance,
              mission: nr,
              useragent: this.deviceService.getDeviceInfo()
            }
          ).subscribe((res: any) => {
            var result = res['result'];
            if (result) {
              this.isProcess = false;
              this.isCompleted = true;
              this.canSelectEarnRegister = nr + 1;

              this.dialog.open(RewardModalComponent, {
                width: '90%',
                maxWidth: '300px',
                data: {
                  reward: this.rewardMission
                }
              })
              this.isRequired = false;
            }
          },
            (error: any) => {
              this.isProcess = false;
              this.isCompleted = false;
              this.isRequired = true;
            });
          //


        }
        else {
          this.isProcess = false;
          this.isRequired = true;
        }
      }
    },
      (error: any) => {
        console.log(error);
        this.isProcess = false;
      });

  }
}
