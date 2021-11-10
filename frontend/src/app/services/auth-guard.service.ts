import {Injectable} from '@angular/core';
import {AuthService} from "./auth-service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, public router: Router) {
    }

    canActivate(): boolean {
        console.log('in guard')
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}