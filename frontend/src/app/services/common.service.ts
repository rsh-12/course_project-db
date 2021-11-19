import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TotalRecords} from "../common/totalRecords";
import {CurrentUser} from "../common/currentUser";
import {Income} from "../common/income";
import {Contract} from "../common/contract";
import {CertificateInfo} from "../common/certificateInfo";

const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    getStatistics(): Observable<TotalRecords> {
        return this.http.get<TotalRecords>(API_URL + 'statistics');
    }

    whoAmI(): Observable<CurrentUser> {
        return this.http.get<CurrentUser>(API_URL + 'whoami');
    }

    getIncome(): Observable<Income[]> {
        return this.http.get<Income[]>(API_URL + 'income');
    }

    getContracts(): Observable<Contract[]> {
        return this.http.get<Contract[]>(API_URL + 'contracts');
    }

    getCertificates(): Observable<CertificateInfo[]> {
        return this.http.get<CertificateInfo[]>(API_URL + 'certificates');
    }

}
