import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseById} from "../common/courseById";
import {Course} from "../common/course";

const API_URL = 'http://localhost:8080/api/courses/';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {
    }

    findAll(instructorId?: number): Observable<Course[]> {
        if (!!instructorId) {
            return this.http.get<Course[]>(`${API_URL}?instructorId=${instructorId}`);
        }

        return this.http.get<Course[]>(API_URL);
    }

    findByName(name: string): Observable<Course[]> {
        return this.http.get<Course[]>(API_URL + '?name=' + name);
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