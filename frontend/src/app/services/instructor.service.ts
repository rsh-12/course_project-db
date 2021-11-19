import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Instructor} from "../common/instructor";

const API_URL = 'http://localhost:8080/api/instructors/';

@Injectable({
    providedIn: 'root'
})
export class InstructorService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Instructor[]> {
        return this.http.get<Instructor[]>(API_URL);
    }

}
