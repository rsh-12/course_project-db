import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Statistics} from "../common/statistics";
import {CurrentUser} from "../common/currentUser";

const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    getStatistics(): Observable<Statistics> {
        return this.http.get<Statistics>(API_URL + 'statistics');
    }

    whoAmI(): Observable<CurrentUser> {
        return this.http.get<CurrentUser>(API_URL + 'whoami');
    }

}
