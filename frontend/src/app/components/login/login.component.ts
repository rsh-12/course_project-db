import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form = {
        username: null,
        password: null
    };

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService,
                private tokenStorage: TokenStorageService,
                private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/home']).then();
        }

        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
    }

    onSubmit(): void {
        const {username, password} = this.form;

        // @ts-ignore
        this.authService.login(username, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data)

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.notificationService.openSnackBar('Successfully logged in as ' + username);
                this.reloadPage();
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    reloadPage() {
        window.location.reload();
    }

    getUsername(): string {
        return this.tokenStorage.getUser().username;
    }

}
