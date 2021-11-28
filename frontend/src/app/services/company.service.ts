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

    findByName(companyName: string): Observable<Company[]> {
        return this.http.get<Company[]>(API_URL + '?name=' + companyName);
    }

    delete(id: number): Observable<Object> {
        return this.http.delete(API_URL + id);
    }

    findById(id: number): Observable<Company> {
        return this.http.get<Company>(API_URL + id);
    }

    add(data: any): Observable<Object> {
        return this.http.post(API_URL, data);
    }

    update(id: number, data: any) {
        return this.http.put(API_URL + id, data);
    }
}
