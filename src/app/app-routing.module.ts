import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleEarnComponent } from './components/simple-earn/simple-earn.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
