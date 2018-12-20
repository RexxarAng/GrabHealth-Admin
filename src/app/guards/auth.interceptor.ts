import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService, 
        private router: Router,
        private flashMessagesService: FlashMessagesService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const clonedreq = req.clone({
                headers:  req.headers.set("Authorization",  this.authService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.flashMessagesService.show("Session expired!", {cssClass:'alert-danger', timeout: 4000});
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            );
        }
    } 
}
