import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './services/storage.service';
import { ModalPopupComponent } from './shared/modal-popup/modal-popup.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { LoginGuardService } from './services/guards/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ModalPopupComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [StorageService, AuthGuardService, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
