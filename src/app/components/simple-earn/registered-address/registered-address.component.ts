import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EarnService } from '../../../services/earn.service';
import { NotifyModalComponent } from '../notify-modal/notify-modal.component';
import { RegisteredAddressModalComponent } from '../registered-address-modal/registered-address-modal.component';

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

    this.earnService.myAddressAccount$.subscribe((value) => {
      clearInterval(this.isInterval);
      this.myAddress = value.address;
      this.balance = parseFloat(value.balance);

      if (value && value.address) {
        this.autoCheckBalance();
      }
      else {
        clearInterval(this.isInterval);
      }
    });
  }


  removeRegister() {
    this.myAddress = "";
    this.earnService.myAddressAccount = {};
    this.balance = 0;
    this.isDisabled = true;
    this.isDisabled = false;
    this.registerForm.reset();
  }

  autoCheckBalance() {
    if (this.earnService.myAddressAccount) {
      this.isInterval = setInterval(() => {
        this.earnService.onRegisterAddress({ address: this.myAddress }).subscribe((res: any) => {
          var result = res['result'];
          if (result.status == 'success') {
            this.myAddress = result.address;
            this.earnService.myAddressAccount = result;
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
    this.earnService.myAddressAccount = {};
    clearInterval(this.isInterval);
  }
  showRegisterModal() {
    this.dialog.open(RegisteredAddressModalComponent, {
      disableClose: true,
      width: '90%',
      maxWidth: '500px',
    })
  }

}
