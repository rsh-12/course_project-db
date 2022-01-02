import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Validators} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    static nonWhitespaceRegExp: RegExp = new RegExp("^\\S");
    router: any;

    static commonValidators(min = 5, max = 50) {
        return [
            Validators.required,
            Validators.pattern(this.nonWhitespaceRegExp),
            Validators.minLength(min),
            Validators.maxLength(max),
        ];
    }

    static isNumeric(val: string): boolean {
        return /^\d+$/.test(val);
    }

    static handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 0) {
            // A client-side or network error occurred
            console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.message);
        }

        return throwError('Something bad happened; please try again later.');
    }

}
