import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../common/student";
import {CommonData} from "../common/commonData";
import {StudentsWithCourses} from "../components/students/students-courses/students-courses.component";
import {environment} from "../../environments/environment";

const API_URL = environment.API_URL + 'students/';

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

    findByCompany(id: number): Observable<Student[]> {
        return this.http.get<Student[]>(`${API_URL}company/${id}`);
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

    delete(id: number) {
        return this.http.delete(API_URL + id);
    }

    findById(id: string): Observable<Student> {
        return this.http.get<Student>(API_URL + id);
    }

    update(id: number, data: any): Observable<Object> {
        return this.http.put(API_URL + id, data, {responseType: 'text'});
    }

    add(data: any): Observable<Student> {
        return this.http.post<Student>(API_URL, data);
    }

    findWithCoursesWithout(data: string): Observable<StudentsWithCourses[]> {
        return this.http.get<StudentsWithCourses[]>(API_URL + 'courses/' + data);
    }

}