import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username,
            password
        }, httpOptions);
    }

    register(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username, password
        }, httpOptions);
    }

    isAuthenticated(): boolean {
        const userData = this.tokenStorage.getUser();
        if (!userData) return false;

        const expires = userData.expires;

        return new Date() < new Date(Date.now() + expires);
    }

}
