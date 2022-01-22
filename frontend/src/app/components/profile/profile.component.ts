import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {CommonService} from "../../services/common.service";
import {CurrentUser} from "../../common/currentUser";
import {NotificationService} from "../../services/notification.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser?: CurrentUser;
    errorMessage: string = '';
    error: boolean = false;

    constructor(private tokenStorageService: TokenStorageService,
                private commonService: CommonService,
                private notificationService: NotificationService,
                private title: Title) {
        title.setTitle('Profile');
    }

    ngOnInit(): void {
        this.commonService.whoAmI().subscribe(
            data => {
                this.currentUser = data;
            }, err => {
                this.errorMessage = err.error.message;
                this.error = true;
            }
        );
    }

    logout() {
        this.currentUser = undefined;
        this.tokenStorageService.signOut();
        window.location.reload();
    }

    confirmDeletion() {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteAccount();
            });
    }

    private deleteAccount() {
        this.notificationService.openSnackBar('Not implemented');
    }

    flushAll() {
        this.commonService.clearCache().subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Success');
            }, err => {
                console.log(err);
                this.notificationService.unknownError();
            }
        );
    }

}
