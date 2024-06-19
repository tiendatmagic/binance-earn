import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EarnService } from '../../../services/earn.service';

@Component({
  selector: 'app-registered-address-modal',
  templateUrl: './registered-address-modal.component.html',
  styleUrl: './registered-address-modal.component.scss'
})
export class RegisteredAddressModalComponent {
  registerForm: FormGroup;
  address: FormControl;
  myAddress: string = "";
  balance: number = 0;
  isDisabled: boolean = false;

  constructor(_fb: FormBuilder, public dialogRef: MatDialogRef<RegisteredAddressModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private earnService: EarnService) {
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.registerForm = _fb.group({
      address: this.address,
    });

    this.earnService.myAddressAccount$.subscribe((value) => {
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
          this.earnService.myAddressAccount = result;
          this.isDisabled = false;
          this.earnService.showModal("", "Đăng ký thành công", "success", false);
          if (this.myAddress) {
            // this.autoCheckBalance();
          }
        }
        else {
          this.isDisabled = false;
          this.earnService.showModal("", "Địa chỉ ví không tồn tại trong hệ thống", "error", true);
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
      this.earnService.showModal("", "Địa chỉ ví không hợp lệ", "error", true);
    }
  }



  onNoClick() {
    this.dialogRef.close();
  }
}
