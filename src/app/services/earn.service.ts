import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EarnService {
  public urlEnv = environment.production ? environment.apiUrl : environment.apiUrlLocal;
  constructor(private http: HttpClient) {

  }

  onRegisterAddress(data: any) {
    return this.http.post(`${this.urlEnv}api/register-address`, data);
  }
}
