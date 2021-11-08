import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {CommonService} from "../../services/common-service";
import {CurrentUser} from "../../common/currentUser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser!: CurrentUser;
    errorMessage: string = '';
    error: boolean = false;

    constructor(private token: TokenStorageService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.commonService.whoAmI().subscribe(
            data => {
                this.currentUser = data;
            }, err => {
                this.errorMessage = err.error.message;
                this.error = true;
            }
        )

    }
}
