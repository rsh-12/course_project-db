import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";

const AUTH_API = environment.API_URL + 'auth/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username, password
        });
    }

    logout() {
        return this.http.post(AUTH_API + 'signout', null, {responseType: 'text'});
    }

    register(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username, password
        });
    }

    isAuthenticated(): boolean {
        const userData = this.tokenStorage.getUser();
        if (!userData) return false;

        const expires = userData.expires;

        return new Date() < new Date(Date.now() + expires);
    }

}
