import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registered-address',
  templateUrl: './registered-address.component.html',
  styleUrl: './registered-address.component.scss'
})
export class RegisteredAddressComponent {
  registerForm: FormGroup;
  address: FormControl;
  myAddress: string = "";

  constructor(_fb: FormBuilder, public dialog: MatDialog) {
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

    if (address.startsWith("0x") && address.length == 42) {
      this.myAddress = address;
      // alert("Cảm ơn bạn đã đăng ký");
    } else {
      // alert("Địa chỉ ví không hợp lệ");
      window.location.href = "https://www.google.com";
    }
  }
}
