import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  dataurl: string;
  showDataUrl: boolean;
  showTokenField: boolean;
  token: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService 
    ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.showDataUrl = false;
    this.showTokenField = false;
    this.token = '';
  }

  onLogin(){
    var credentials;
    if(this.token != ''){
        credentials = {
        email: this.email,
        password: this.password,
        token: this.token
      };
    } else {
        credentials = {
        email: this.email,
        password: this.password
      };
    }


    if (!this.validateService.validateEmail(this.email)){
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.password === ''){
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
   

    this.authService.loginAdmin(credentials).subscribe(
      res => {
        console.log(res);
        if(res['success']){
          if(res['setup']){
            this.dataurl = res['data'];
            this.showTokenField = true;
            this.showDataUrl = true;
            return true;
          }
          if(res['verify']){
            this.showTokenField = true;
            return true;
          }
          if(res['authenticated']){
            this.authService.setToken(res['token'])
            this.router.navigateByUrl('/clinic/registration');
          }
        } else {
          this.flashMessagesService.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000});
          this.showTokenField = false;
          this.token = '';
          this.showDataUrl = false;
        }
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000});
        this.showTokenField = false;
        this.showDataUrl = false;
        this.token = '';
        console.log(err);
      }
    );
  }
}
