import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Instructor} from "../common/instructor";
import {CommonData} from "../common/commonData";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {UtilsService} from "./utils.service";

const API_URL = environment.API_URL + 'instructors/';

@Injectable({
    providedIn: 'root'
})
export class InstructorService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Instructor[]> {
        return this.http.get<Instructor[]>(API_URL)
            .pipe(catchError(UtilsService.handleError));
    }

    findByName(instructorName: string): Observable<Instructor[]> {
        return this.http.get<Instructor[]>(API_URL, {
            params: {
                name: instructorName
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    findByCourse(id: number): Observable<CommonData[]> {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`)
            .pipe(catchError(UtilsService.handleError));
    }

    findExceptCourse(id: number) {
        return this.http.get<CommonData[]>(`${API_URL}course/${id}`, {
            params: {
                except: true
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    removeFromCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {responseType: 'text'})
            .pipe(catchError(UtilsService.handleError));
    }

    addToCourse(id: number, data: { ids: number[] }) {
        return this.http.post(`${API_URL}course/${id}`, data, {
            responseType: 'text',
            params: {
                add: true
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    findById(id: number | string): Observable<Instructor> {
        return this.http.get<Instructor>(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    update(id: number | string, data: any): Observable<Object> {
        return this.http.put(API_URL + id, data)
            .pipe(catchError(UtilsService.handleError));
    }

    add(data: any): Observable<Object> {
        return this.http.post(API_URL, data)
            .pipe(catchError(UtilsService.handleError));
    }

}
