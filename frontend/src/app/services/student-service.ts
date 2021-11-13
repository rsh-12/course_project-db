import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../common/student";

const API_URL = 'http://localhost:8080/api/students/';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Student[]> {
        return this.http.get<Student[]>(API_URL);
    }

}