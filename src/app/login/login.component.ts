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
  constructor(
    private authService: AuthService,
    private router: Router,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService 
    ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  onLogin(){
    const credentials = {
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateEmail(this.email)){
      this.flashMessagesService.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (this.password == ''){
      this.flashMessagesService.show('Please enter your password', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
   

    this.authService.loginAdmin(credentials).subscribe(
      res => {
        this.authService.setToken(res['token'])
        this.router.navigateByUrl('/clinic/registration');
      },
      err => {
        this.flashMessagesService.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 3000});
        console.log(err);
      }
    );
  }
}
