import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
    ) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) : boolean {
        if(this.authService.loggedIn()) {
            return true;
        } else {
            this.flashMessagesService.show('Session expired!', { cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/login']);
            this.authService.deleteToken();
            return false;
        }
    }
}