import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../common/student";
import {CommonData} from "../common/commonData";

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

    findWithoutContracts(): Observable<Student[]> {
        return this.http.get<Student[]>(`${API_URL}without/contracts`);
    }

    findByCourse(id: number): Observable<CommonData[]> {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`);
    }

    findExceptCourse(id: number) {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}?except=true`);
    }

    addToCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}?add=true`, data, {responseType: 'text'});
    }

    removeFromCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {responseType: 'text'});
    }

    findByName(studentName: string): Observable<Student[]> {
        return this.http.get<Student[]>(API_URL + '?name=' + studentName);
    }

}