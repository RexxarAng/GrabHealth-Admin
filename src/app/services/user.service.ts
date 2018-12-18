import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  // private url = "/routes/comment";
  constructor(private http: Http) {
    console.log('Comment Service Initialized...');
  }

  getCurrentUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('/routes/getCurentUser', {headers: headers})
      .map(response => response.json());
  }

}