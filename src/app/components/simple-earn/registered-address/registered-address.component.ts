import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EarnService } from '../../../services/earn.service';
import { NotifyModalComponent } from '../notify-modal/notify-modal.component';

@Component({
  selector: 'app-registered-address',
  templateUrl: './registered-address.component.html',
  styleUrl: './registered-address.component.scss'
})
export class RegisteredAddressComponent {
  registerForm: FormGroup;
  address: FormControl;
  myAddress: string = "";
  balance: number = 0;
  isDisabled: boolean = false;
  isInterval: any;

  constructor(_fb: FormBuilder, public dialog: MatDialog, private earnService: EarnService) {
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.registerForm = _fb.group({
      address: this.address,
    });
  }

  register() {
    var address = this.registerForm.value.address;

    if (!address) {
      return;
    }

    this.isDisabled = true;
    if (address.startsWith("0x") && address.length == 42) {
      this.earnService.onRegisterAddress({ address: address }).subscribe((res: any) => {
        var result = res['result'];
        if (result.status == 'success') {
          this.myAddress = result.address;
          this.balance = parseFloat(result.balance);
          this.isDisabled = false;
          this.showModal("", "Đăng ký thành công", "success", false);
          if (this.myAddress) {
            this.autoCheckBalance();
          }
        }
        else {
          this.isDisabled = false;
          this.showModal("", "Địa chỉ ví không tồn tại trong hệ thống", "error", true);
          setTimeout(() => {
            window.location.href = "https://www.google.com";
          }, 2000);
        }
      },
        (error: any) => {
          console.log(error);
          this.isDisabled = false;
        });
    } else {
      this.isDisabled = false;
      this.showModal("", "Địa chỉ ví không hợp lệ", "error", true);
    }
  }

  removeRegister() {
    this.myAddress = "";
    this.balance = 0;
    this.isDisabled = true;
    this.autoCheckBalance();
    this.isDisabled = false;
    this.registerForm.reset();
  }

  autoCheckBalance() {
    if (this.myAddress) {
      this.isInterval = setInterval(() => {
        this.earnService.onRegisterAddress({ address: this.myAddress }).subscribe((res: any) => {
          var result = res['result'];
          if (result.status == 'success') {
            this.myAddress = result.address;
            this.balance = parseFloat(result.balance);
            this.isDisabled = false;
          }
        },
          (error: any) => {
            console.log(error);
          });
      }, 5000);
    }
    else {
      clearInterval(this.isInterval);
    }
  }

  ngOnDestroy() {
    // Hủy bỏ interval khi component bị hủy
    clearInterval(this.isInterval);
  }

  showModal(title: string, message: string, status: string, showCloseBtn: boolean = true) {
    this.dialog.closeAll();
    this.dialog.open(NotifyModalComponent, {
      disableClose: true,
      width: '90%',
      maxWidth: '400px',
      data: {
        title: title,
        message: message,
        status: status,
        showCloseBtn: showCloseBtn
      }
    });
  }
}
