import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TotalRecords} from "../common/totalRecords";
import {CurrentUser} from "../common/currentUser";
import {Income} from "../common/income";
import {Contract} from "../common/contract";
import {CertificateInfo} from "../common/certificateInfo";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {UtilsService} from "./utils.service";
import {FormGroup} from "@angular/forms";

const API_URL = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient,
                private router: Router) {
    }

    getStatistics(): Observable<TotalRecords> {
        return this.http.get<TotalRecords>(API_URL + 'statistics');
    }

    getStudentAge(form: FormGroup) {
        const dateOfBirth = form.controls['dateOfBirth'].value;
        if (!!dateOfBirth) {
            return Math.floor((+new Date() - new Date(dateOfBirth).getTime()) / 3.15576e+10);
        }
        return 0;
    }

    goToPage(url: string): void {
        this.router.navigate([url]).then();
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
        return this.http.get<CertificateInfo[]>(API_URL + 'certificates')
            .pipe(catchError(UtilsService.handleError));
    }

    deleteCertificate(id: number | string) {
        return this.http.delete(API_URL + 'certificates/' + id, {responseType: 'text'});
    }

    deleteContract(id: number | string) {
        return this.http.delete(API_URL + 'contracts/' + id, {responseType: 'text'});
    }

    addCertificate(id: number | string, dates: { conclusionDate?: Date; completionDate?: Date; }) {
        return this.http.post(API_URL + 'certificates', {id, dates});
    }

    addContract(id: number | string, dates: { dateOfIssue?: Date }) {
        return this.http.post(API_URL + 'contracts', {id, dates});
    }

    clearCache(): Observable<Object> {
        return this.http.delete(API_URL + 'caches');
    }

}
