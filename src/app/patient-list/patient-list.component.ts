import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  nric: any;
  patients: Array<any>;
  patient: any;
  nricSearch: any;
  constructor(
    private adminService: AdminService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(){
    this.adminService.getPatients().subscribe(
      res=>{
        if(res['unauthenticated']){
          this.authService.logout();
        }
        this.patients = res['patients'];
      },
      err=>{
        this.flashMessagesService.show(err['msg'], { cssClass: 'alert-danger', timeout: 3000});
      }
    )
  }

  viewPatientInfo(patient){
    this.patient = patient;
  }

  removePatient(patient){
    this.patient = patient;

  }
  onRemovePatient(){
    this.adminService.removePatient(this.patient.nric).subscribe(
      res=>{
        if(res['success']){
          this.getPatients();
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-success', timeout: 3000});
        } else {
          if(res['unauthenticated']){
            this.authService.logout();
          }
        }
      },
      err=> {

      }
      )
  }

}
