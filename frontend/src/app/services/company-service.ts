import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

const API_URL = 'http://localhost:8080/api/companies/';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient) {
    }




}
