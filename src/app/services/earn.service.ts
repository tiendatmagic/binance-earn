import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { NotifyModalComponent } from '../components/simple-earn/notify-modal/notify-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EarnService {
  public urlEnv = environment.production ? environment.apiUrl : environment.apiUrlLocal;
  myAddress: any = [];
  constructor(private http: HttpClient, public dialog: MatDialog) {

  }

  onRegisterAddress(data: any) {
    return this.http.post(`${this.urlEnv}api/register-address`, data);
  }

  getMaxMission(data: any) {
    return this.http.post(`${this.urlEnv}api/get-max-mission`, data);
  }

  onPostMission(data: any) {
    return this.http.post(`${this.urlEnv}api/post-mission`, data);
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
