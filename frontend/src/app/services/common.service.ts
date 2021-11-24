import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TotalRecords} from "../common/totalRecords";
import {CurrentUser} from "../common/currentUser";
import {Income} from "../common/income";
import {Contract} from "../common/contract";
import {CertificateInfo} from "../common/certificateInfo";
import {InstructorService} from "./instructor.service";
import {StudentService} from "./student.service";
import {Validators} from "@angular/forms";

const API_URL = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    static nonWhitespaceRegExp: RegExp = new RegExp("^\\S");

    constructor(private http: HttpClient,
                private instructorService: InstructorService,
                private studentService: StudentService) {
    }

    static commonValidators(min = 5, max = 50) {
        return [
            Validators.required,
            Validators.pattern(this.nonWhitespaceRegExp),
            Validators.minLength(min),
            Validators.maxLength(max),
        ];
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

    // load data with specific service class
    defineLoadingMethod(isRelated: boolean, entityId: number, entityName: string) {
        const serviceClass = this.defineServiceClass(entityName);

        return isRelated
            ? serviceClass.findByCourse(entityId)
            : serviceClass.findExceptCourse(entityId);
    }

    // modify data with specific service class
    defineModifyingMethod(isAdding: boolean, entityId: number, entityName: string, data: { ids: number[] }) {
        const serviceClass = this.defineServiceClass(entityName);

        return isAdding
            ? serviceClass.addToCourse(entityId, data)
            : serviceClass.removeFromCourse(entityId, data);
    }

    private defineServiceClass(entityName: string) {
        return entityName === 'instructors' ? this.instructorService : this.studentService;
    }
}
