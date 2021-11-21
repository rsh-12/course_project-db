import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseInfo} from "../common/courseInfo";
import {CourseById} from "../common/courseById";

const API_URL = 'http://localhost:8080/api/courses/';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {
    }

    findAll(instructorId?: number): Observable<CourseInfo[]> {
        if (!!instructorId) {
            return this.http.get<CourseInfo[]>(`${API_URL}?instructorId=${instructorId}`);
        }

        return this.http.get<CourseInfo[]>(API_URL);
    }

    findByName(name: string): Observable<CourseInfo[]> {
        return this.http.get<CourseInfo[]>(API_URL + '?name=' + name);
    }

    findById(id: string): Observable<CourseById> {
        return this.http.get<CourseById>(API_URL + id);
    }

    update(id: number, data: any): Observable<any> {
        return this.http.put(API_URL + id, data);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(API_URL + id);
    }

    add(data: any): Observable<any> {
        return this.http.post(API_URL, data);
    }

}