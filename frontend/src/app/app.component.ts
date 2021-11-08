import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ButtonSheetComponent} from "./components/button-sheet/button-sheet.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'courses';
    isLoggedIn = false;
    username?: string;

    constructor(private tokenStorageService: TokenStorageService,
                private bottomSheet: MatBottomSheet) {
    }

    openBottomSheet() {
        this.bottomSheet.open(ButtonSheetComponent);
    }

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.username = user.username;
        }
    }

    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }

}
