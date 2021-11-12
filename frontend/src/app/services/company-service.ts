import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../common/company";

const API_URL = 'http://localhost:8080/api/companies/';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Company[]> {
        return this.http.get<Company[]>(API_URL);
    }


}
