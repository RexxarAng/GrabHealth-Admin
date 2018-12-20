import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AdminService {

  // private url = "/routes/comment";
    constructor(private http: HttpClient) {
        console.log('Comment Service Initialized...');
    }

    registerClinic(manager, clinic) {
        const clinicDetails = {
            manager: manager,
            clinic: clinic
        };
 
        return this.http.post('http://localhost:4560/admin/clinic/register', clinicDetails);                     
    }
    getClinics(){
        return this.http.get('http://localhost:4560/admin/clinicList')
    }   
  

}