import { SingleCountryComponent } from './../../components/single-country/single-country.component';

import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { CountriesComponent } from './../../components/countries/countries.component';


// Import canActivate guard services
import { AuthGuard } from '../guard/auth.guard';
import { SecureInnerPagesGuard } from './../guard/secure-inner-pages.guard.ts.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'single-country/:name', component: SingleCountryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    //{ enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
