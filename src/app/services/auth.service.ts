import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/map';


interface ClinicInfo {
    manager : {
        firstName: string,
        lastName: string,
        nric: string,
        address: string,
        contactNo: number,
        email: string,
        doctorLicenseNo: string
    },
    clinic : {
        name: string,
        address: string,
        location: string,
        contactNo: number,
        clinicLicenseNo: string,
        clinicPhoto: string
    }
}
@Injectable()
export class AuthService {
    noAuthHeader = { headers: new HttpHeaders({"NoAuth": "true"}) };

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService
        ) {}


    loginAdmin(credentials){
        return this.http.post('http://localhost:4560/admin/authenticate', credentials, this.noAuthHeader);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    setToken(token: string){
        sessionStorage.setItem('token', token);
    }
    deleteToken(){
        sessionStorage.clear();
    }

    getUserPayload(){
        var token = sessionStorage.getItem('token');
        if (token){
            return token;
        } else 
            return null;
    }
    loggedIn(){
        var userPayload = this.getUserPayload();
        if (userPayload) {
            if (!this.jwtHelper.isTokenExpired(userPayload))
                return true;
        } else {
            return false;
        }

    }

}
