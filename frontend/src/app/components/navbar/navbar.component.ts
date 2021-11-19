import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {CommonService} from "../../services/common.service";
import {TotalRecords} from "../../common/totalRecords";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    username?: string;

    errorMessage = '';
    totalRecords?: TotalRecords;
    totalCount = 0;

    value = '';
    myControl = new FormControl();
    options: string[] = ['companies', 'students', 'contracts', 'certificates', 'home', 'instructors', 'courses'];
    filteredOptions?: Observable<string[]>;

    constructor(private tokenStorageService: TokenStorageService,
                private commonService: CommonService,
                private router: Router) {
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
        this.getUsername();
        this.getStatistics();
    }

    private getUsername() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.username = user.username;
        }
    }

    private getStatistics() {
        this.commonService.getStatistics().subscribe(
            data => {
                this.totalCount = Object.values(data).reduce((a, b) => +a + +b);
                return this.totalRecords = data;
            },
            err => {
                console.log(err.error.message);
                this.errorMessage = err.error.message;
            }
        );
    }

    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }

    navigateTo() {
        this.router.navigate([this.value]);
        this.value = '';
    }
}

