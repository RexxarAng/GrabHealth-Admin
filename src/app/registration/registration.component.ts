import { Component, OnInit, Injectable } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls : ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    //Manager
    mFirstName: String;
    mLastName: String;
    mEmail: String;
    mNric: String;
    mDoctorLicenseNo: String;
    mContactNo: String;
    mAddress: String;

    //Clinic
    cName: String;
    cLicenseNo: String;
    cContactNo: String;
    cLocation: String;
    cAddress: String;
    cPhoto: String;
    
    constructor(
        private validateService: ValidateService,
        private flashMessagesService: FlashMessagesService,
        private adminService: AdminService,
        private router: Router,
        private authService: AuthService
        ){ }

    ngOnInit() {
    //Manager
    this.mFirstName = '';
    this.mFirstName = '';
    this.mLastName = '';
    this.mNric = '';
    this.mAddress = '';
    this.mContactNo = '';
    this.mEmail = '';
    this.mDoctorLicenseNo = '';

    this.cName = '';
    this.cAddress = '';
    this.cLocation = '';
    this.cContactNo = '';
    this.cLicenseNo = '';
    }

    onRegister(){
        const manager = {
            firstName: this.mFirstName.trim(),
            lastName: this.mLastName.trim(),
            nric: this.mNric.trim(),
            address: this.mAddress.trim(),
            contactNo: this.mContactNo.trim(),
            email: this.mEmail.trim(),
            doctorLicenseNo: this.mDoctorLicenseNo.trim()
        }
        const clinic = {
            name: this.cName.trim(),
            address: this.cAddress.trim(),
            location: this.cLocation.trim(),
            contactNo: this.cContactNo.trim(),
            clinicLicenseNo: this.cLicenseNo.trim()
        }

        // Required fields
        if(!this.validateService.validateClinicRegistration(manager, clinic)) {
            this.flashMessagesService.show('Please enter all fills', { cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

        // Validate Email
        if(!this.validateService.validateEmail(manager.email)){
            this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

        if(!this.validateService.validateContactNo(manager.contactNo) || !this.validateService.validateContactNo(clinic.contactNo)) {
            this.flashMessagesService.show('Please enter a valid contact number', { cssClass: 'alert-danger', timeout: 3000});
            return false;
        }
        if(!this.validateService.validateNric(manager.nric)){
            this.flashMessagesService.show('Please enter a valid nric capitalized', { cssClass: 'alert-danger', timeout: 3000});
            return false;
        }
        
        this.adminService.registerClinic(manager, clinic).subscribe(
            res => {
                console.log(res);
                if(res['unauthenticated']){
                    this.authService.logout();
                }
                if(res['success']) {
                    this.flashMessagesService.show('You have successfully registered the clinic', { cssClass: 'alert-success', timeout: 3000});
                    this.router.navigateByUrl('/clinicList');
                } else {
                    this.flashMessagesService.show("Manager or Clinic already exists", { cssClass: 'alert-danger', timeout: 3000});
                }
                
            },
            err => {
                console.log(err);
                this.flashMessagesService.show("Something happened", { cssClass: 'alert-danger', timeout: 3000});
                this.router.navigateByUrl('/clinic/register');
            }     
        );  
        
    }

}
