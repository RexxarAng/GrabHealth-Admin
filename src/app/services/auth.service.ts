import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    noAuthHeader = { headers: new HttpHeaders({"NoAuth": "true"}) };
    url = environment.url;

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
        ) {}


    loginAdmin(credentials){
        return this.http.post(this.url + '/admin/authenticate2FA', credentials, this.noAuthHeader);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    logout(){
        var userPayload = this.getUserPayload();
        if (userPayload) {
            if (!this.jwtHelper.isTokenExpired(userPayload)){
                return this.http.post(this.url + '/blacklistToken', "Nothing").subscribe(
                    res=>{
                        this.deleteToken();
                        this.router.navigateByUrl('/login');
                    });
            } else {
                this.deleteToken();
                this.router.navigateByUrl('/login');
            }
        } else {
            this.deleteToken();
            return this.router.navigateByUrl('/login');
        }

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
