import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SimpleEarnRegisterModalComponent } from '../simple-earn-register-modal/simple-earn-register-modal.component';

@Component({
  selector: 'app-simple-earn',
  templateUrl: './simple-earn.component.html',
  styleUrl: './simple-earn.component.scss'
})
export class SimpleEarnComponent {
  registerForm: FormGroup;
  address: FormControl;
  chars: any = [...'0123456789abcdef'];
  addresses: any = [];
  listRewards: any = [];
  @ViewChild('listContainer', { static: false }) listContainer!: ElementRef;
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
    if (address.startsWith("0x") && address.length == 42) {
      alert("Cảm ơn bạn đã đăng ký");
    } else {
      alert("Địa chỉ ví không hợp lệ");
    }
  }

  openRegister() {
    this.dialog.closeAll();
    this.dialog.open(SimpleEarnRegisterModalComponent, {
      width: '90%',
      maxWidth: '500px',
    });
  }

  // Tạo pool các ký tự cho địa chỉ ví


  // Hàm tạo chuỗi ngẫu nhiên
  generateRandomString(length: any) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      result += this.chars[randomIndex];
    }
    return result;
  }

  // Hàm tạo địa chỉ ví ngẫu nhiên
  generateRandomAddress() {
    const prefix = '0x';
    const lengthBeforeDot = 3; // Độ dài phần trước dấu ...
    const lengthAfterDot = 3; // Độ dài phần sau dấu ...
    const randomStringBeforeDot = this.generateRandomString(lengthBeforeDot);
    const randomStringAfterDot = this.generateRandomString(lengthAfterDot);
    return prefix + randomStringBeforeDot + '...' + randomStringAfterDot;
  }

  // Hàm tạo thông báo ngẫu nhiên
  generateRandomNotification() {
    for (let i = 0; i < 10; i++) { // Tạo 10 địa chỉ ví (thay đổi số lượng nếu cần)
      this.addresses.push(this.generateRandomAddress());
    }
    this.scrollToBottom();
    const randomAddressIndex = Math.floor(Math.random() * this.addresses.length);
    const address = this.addresses[randomAddressIndex];

    const amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    const notification = `${address} vừa nhận được ${amount} USDT`;
    this.listRewards.push({
      'address': address,
      'amount': amount,
    });

    return notification;
  }

  ngOnInit() {
    // Hiển thị thông báo ngẫu nhiên
    for (let i = 0; i < 6; i++) {
      this.generateRandomNotification();
    }
    setInterval(() => {
      this.generateRandomNotification();
    }, 5000);

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.listContainer) {
      this.listContainer.nativeElement.scrollTop = this.listContainer.nativeElement.scrollHeight;
    }
  }
  // Ví dụ về địa chỉ ví được tạo:
  // 0x123...abc vừa nhận được 10 USDT!
  // 0x456...def vừa nhận được 3 USDT!
  // 0x789...ghi vừa nhận được 7 USDT!


}