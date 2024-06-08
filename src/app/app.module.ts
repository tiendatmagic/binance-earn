import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { SimpleEarnComponent } from './components/simple-earn/simple-earn.component';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { SimpleEarnRegisterModalComponent } from './components/simple-earn-register-modal/simple-earn-register-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CoinListComponent } from './components/simple-earn/coin-list/coin-list.component';
import { RegisteredAddressComponent } from './components/simple-earn/registered-address/registered-address.component';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotifyModalComponent } from './components/simple-earn/notify-modal/notify-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SimpleEarnComponent,
    SimpleEarnRegisterModalComponent,
    CoinListComponent,
    RegisteredAddressComponent,
    NotifyModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
