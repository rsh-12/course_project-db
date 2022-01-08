import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../common/student";
import {CommonData} from "../common/commonData";
import {StudentsWithCourses} from "../components/students/students-courses/students-courses.component";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {UtilsService} from "./utils.service";

const API_URL = environment.API_URL + 'students/';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Student[]> {
        return this.http.get<Student[]>(API_URL)
            .pipe(catchError(UtilsService.handleError));
    }

    findWithoutContracts(): Observable<Student[]> {
        return this.http.get<Student[]>(`${API_URL}without/contracts`)
            .pipe(catchError(UtilsService.handleError));
    }

    findByCourse(id: number): Observable<CommonData[]> {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`)
            .pipe(catchError(UtilsService.handleError));
    }

    findByCompany(id: number): Observable<Student[]> {
        return this.http.get<Student[]>(`${API_URL}company/${id}`)
            .pipe(catchError(UtilsService.handleError));
    }

    findExceptCourse(id: number) {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`, {
            params: {
                except: true
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    addToCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {
            responseType: 'text',
            params: {
                add: true
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    removeFromCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {responseType: 'text'})
            .pipe(catchError(UtilsService.handleError));
    }

    findByName(studentName: string): Observable<Student[]> {
        return this.http.get<Student[]>(API_URL, {
            params: {
                name: studentName
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    delete(id: number) {
        return this.http.delete(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    findById(id: string): Observable<Student> {
        return this.http.get<Student>(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    update(id: number, data: any): Observable<Object> {
        return this.http.put(API_URL + id, data, {responseType: 'text'})
            .pipe(catchError(UtilsService.handleError));
    }

    add(data: any): Observable<Student> {
        return this.http.post<Student>(API_URL, data)
            .pipe(catchError(UtilsService.handleError));
    }

    findWithCoursesWithout(data: string): Observable<StudentsWithCourses[]> {
        return this.http.get<StudentsWithCourses[]>(API_URL + 'courses/' + data)
            .pipe(catchError(UtilsService.handleError));
    }

}