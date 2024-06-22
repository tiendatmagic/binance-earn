import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EarnService } from '../../services/earn.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss'
})
export class AddAddressComponent {
  addAddressForm: FormGroup;
  address: FormControl;
  isDisabled: boolean = false;

  constructor(_fb: FormBuilder, private earnService: EarnService) {
    this.address = new FormControl('', [
      Validators.required
    ]);
    this.addAddressForm = _fb.group({
      address: this.address,
    });
  }

  register() {
    var address = this.addAddressForm.value.address;

    if (!address) {
      return;
    }
    console.log(address);
    this.isDisabled = true;

    if (address.startsWith("0x") && address.length == 42) {
      this.earnService.addAddress({ address: address }).subscribe((res: any) => {
        var result = res['result'];
        if (result) {
          this.isDisabled = false;
          // this.earnService.showModal("", "Thêm địa chỉ ví mới thành công", "success", false);
        }
        else {
          this.isDisabled = false;
          this.earnService.showModal("", "Thêm địa chỉ ví thất bại", "error", true);
        }
      },
        (error: any) => {
          console.log(error);
          this.isDisabled = false;
          this.earnService.showModal("", "Thêm địa chỉ ví thất bại", "error", true);
        });
    }
    else {
      this.isDisabled = false;
      this.earnService.showModal("", "Địa chỉ ví không hợp lệ", "error", true);
    }
  }
}
