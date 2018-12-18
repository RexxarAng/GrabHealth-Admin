import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
@Injectable()
export class NavComponent implements OnInit {
  
  appTitle = 'GrabHealth';
  
  menuDisplay: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    //menu not opened
    this.menuDisplay = false;
  }
  
  toggleMenu() {
    //if menu is closed, open it
    if(this.menuDisplay == false) {
      this.menuDisplay = true;
    } else {
      //if menu is opened, close it
      this.menuDisplay = false;
    }
  }
  OnLogin() {
    this.router.navigateByUrl("/login");
  }
  OnHome() {
    this.router.navigateByUrl("/home");
  }

  OnRegister() {
    this.router.navigateByUrl("/registration"); 
  }
  
}
