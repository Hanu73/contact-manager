import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { LoginGuardService } from './services/guards/login-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[AuthGuardService]},
  {path: 'signup', component: SignupComponent, canActivate:[LoginGuardService]},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
