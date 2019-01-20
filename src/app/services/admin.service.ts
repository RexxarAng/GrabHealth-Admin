import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {}

    url = environment.url;
    registerClinic(manager, clinic) {
        const clinicDetails = {
            manager: manager,
            clinic: clinic
        };
 
        return this.http.post(this.url + '/admin/clinic/register', clinicDetails);                     
    }
    getClinics(){
        return this.http.get(this.url + '/admin/clinicList');
    }  
    
    removeClinic(clinic){
        return this.http.post(this.url + '/admin/clinic/remove', clinic);
    }
  

}