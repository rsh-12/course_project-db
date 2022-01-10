import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseById} from "../common/courseById";
import {Course} from "../common/course";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {UtilsService} from "./utils.service";

const API_URL = environment.API_URL + 'courses/';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) {
    }

    findAll(instructorId?: number): Observable<Course[]> {
        if (!!instructorId) {
            return this.http.get<Course[]>(API_URL, {
                params: {
                    instructorId
                }
            }).pipe(catchError(UtilsService.handleError));
        }

        return this.http.get<Course[]>(API_URL)
            .pipe(catchError(UtilsService.handleError));
    }

    findByName(name: string): Observable<Course[]> {
        return this.http.get<Course[]>(API_URL, {
            params: {
                name
            }
        }).pipe(catchError(UtilsService.handleError));
    }

    findById(id: string | number): Observable<CourseById> {
        return this.http.get<CourseById>(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    update(id: number, data: any): Observable<any> {
        return this.http.put(API_URL + id, data)
            .pipe(catchError(UtilsService.handleError));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(API_URL + id)
            .pipe(catchError(UtilsService.handleError));
    }

    add(data: any): Observable<any> {
        return this.http.post(API_URL, data)
            .pipe(catchError(UtilsService.handleError));
    }

}