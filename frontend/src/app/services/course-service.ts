import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseInfo} from "../common/courseInfo";

const API_URL = 'http://localhost:8080/api/courses/';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CourseInfo[]> {
        return this.http.get<CourseInfo[]>(API_URL);
    }

    findByName(name: string) {
        return this.http.get<CourseInfo[]>(API_URL + '?name=' + name);
    }
}