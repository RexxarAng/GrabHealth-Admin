import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'clinic/registration' , component: RegistrationComponent, canActivate:[AuthGuard]},
  { path: 'clinicList', component: ClinicListComponent, canActivate:[AuthGuard]},
  { path: 'patientList', component: PatientListComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
