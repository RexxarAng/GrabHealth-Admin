import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent implements OnInit {

  clinic:any;
  clinics:Array<any>;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
  ) { }
 

  ngOnInit() {
    this.getClinics();

  }
  
  getClinics(){
    this.adminService.getClinics().subscribe(
      res=> {
        if(res['unauthenticated']){
          this.authService.logout();
        }
        this.clinics = res['clinics'];
      }, 
      err=> {
        console.log(err);
      });
  }

  viewClinicInfo(clinic){
    this.clinic = clinic;
  }

  removeClinic(clinic){
    this.clinic = clinic;
  }

  onRemoveClinic(){
    this.adminService.removeClinic(this.clinic).subscribe(
      res => {
        console.log(res);
        if(res['success']){
          this.getClinics();
          this.flashMessagesService.show('Clinic removed!', { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.logout();
          }
        }
      },
      err => {

      }
    );
  }

}
