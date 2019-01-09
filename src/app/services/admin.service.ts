import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {}

    registerClinic(manager, clinic) {
        const clinicDetails = {
            manager: manager,
            clinic: clinic
        };
 
        return this.http.post('http://localhost:4560/admin/clinic/register', clinicDetails);                     
    }
    getClinics(){
        return this.http.get('http://localhost:4560/admin/clinicList');
    }  
    
    removeClinic(clinic){
        return this.http.post('http://localhost:4560/admin/clinic/remove', clinic);
    }
  

}