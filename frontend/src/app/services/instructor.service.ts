import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Instructor} from "../common/instructor";
import {CommonData} from "../common/commonData";

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

    findByCourse(id: number): Observable<CommonData[]> {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`);
    }

    findExceptCourse(id: number) {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}?except=true`);
    }

    removeFromCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {responseType: 'text'});
    }

    addToCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}?add=true`, data, {responseType: 'text'});
    }

}
