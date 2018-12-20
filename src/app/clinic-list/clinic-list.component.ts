import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
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
    private adminService: AdminService
  ) { }
 

  ngOnInit() {
    this.getClinics();

  }
  
  getClinics(){
    this.adminService.getClinics().subscribe(
      res=> {
        this.clinics = res['clinics'];
      }, 
      err=> {
        console.log(err);
      });
  }

  viewClinicInfo(clinic){
    this.clinic = clinic;
  }

}
