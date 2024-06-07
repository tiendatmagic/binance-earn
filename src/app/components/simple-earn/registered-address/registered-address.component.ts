import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EarnService } from '../../../services/earn.service';

@Component({
  selector: 'app-registered-address',
  templateUrl: './registered-address.component.html',
  styleUrl: './registered-address.component.scss'
})
export class RegisteredAddressComponent {
  registerForm: FormGroup;
  address: FormControl;
  myAddress: string = "";
  balance: string = "";
  isDisabled: boolean = false;

  constructor(_fb: FormBuilder, public dialog: MatDialog, private earnService: EarnService) {
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.registerForm = _fb.group({
      address: this.address,
    });
  }

  register() {
    this.isDisabled = true;
    var address = this.registerForm.value.address;

    if (!address) {
      return;
    }

    if (address.startsWith("0x") && address.length == 42) {
      this.earnService.onRegisterAddress({ address: address }).subscribe((res: any) => {
        var result = res['result'];
        if (result.status == 'success') {
          this.myAddress = result.address;
          this.balance = result.balance;
          this.isDisabled = false;
        }
        else {
          this.isDisabled = false;
          alert("Địa chỉ ví không tồn tại trong hệ thống");
          window.location.href = "https://www.google.com";
        }
      },
        (error: any) => {
          console.log(error);
          this.isDisabled = false;
        });
    } else {
      this.isDisabled = false;
      alert("Địa chỉ ví không hợp lệ");
    }
  }
}
