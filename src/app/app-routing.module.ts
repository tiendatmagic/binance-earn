import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleEarnComponent } from './components/simple-earn/simple-earn.component';
import { AddAddressComponent } from './components/add-address/add-address.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleEarnComponent,
    data: { title: 'Trang chủ' }
  },
  {
    path: 'home',
    component: SimpleEarnComponent,
    data: { title: 'Trang chủ' }
  },
  {
    path: 'address',
    component: AddAddressComponent,
    data: { title: 'Thêm địa chỉ ví' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
