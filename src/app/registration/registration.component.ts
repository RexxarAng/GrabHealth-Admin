import { Component, OnInit, Injectable } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    
    constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService){}

    ngOnInit() {
    }

    onRegister(){
        const manager = {
            firstName: this.mFirstName,
            lastName: this.mLastName,
            nric: this.mNric,
            address: this.mAddress,
            contactNo: this.mContactNo,
            email: this.mEmail,
            doctorLicenseNo: this.mDoctorLicenseNo
        }
        const clinic = {
            name: this.cName,
            address: this.cAddress,
            location: this.cLocation,
            contactNo: this.cContactNo,
            clinicLicenseNo: this.cLicenseNo,
            clinicPhoto: this.cPhoto
        }
        console.log(manager);
        console.log(clinic);

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
            this.flashMessagesService.show('Please enter a valid nric', { cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

        
    }

}
