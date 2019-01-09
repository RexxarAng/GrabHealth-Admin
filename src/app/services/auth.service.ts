import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    noAuthHeader = { headers: new HttpHeaders({"NoAuth": "true"}) };

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
        ) {}


    loginAdmin(credentials){
        return this.http.post('http://localhost:4560/admin/authenticate2FA', credentials, this.noAuthHeader);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    logout(){
        return this.http.post('http://localhost:4560/blacklistToken', "Nothing").subscribe(
            res=>{
                this.router.navigateByUrl('/login');
                this.deleteToken();
            });
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
