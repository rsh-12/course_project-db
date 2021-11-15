import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommonService} from "../../services/common-service";
import {TotalRecords} from "../../common/totalRecords";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    username?: string;

    errorMessage = '';
    totalRecords!: TotalRecords;
    totalCount = 0;

    constructor(private tokenStorageService: TokenStorageService,
                private commonService: CommonService) {
    }

    ngOnInit(): void {
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

    items = [
        {
            id: 1,
            text: 'First item'
        },
        {
            id: 2,
            text: 'Second item'
        },
        {
            id: 3,
            text: 'Third item'
        }
    ];

}

