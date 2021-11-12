import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
    selector: 'app-button-sheet',
    template: `
        <mat-nav-list>

            <a href="/companies" mat-list-item routerLink="companies" (click)="openLink($event)">
                <span mat-line>COMPANIES</span>
                <span class="gray" mat-line>Go to the companies page</span>
            </a>

            <a href="/students" mat-list-item routerLink="students" (click)="openLink($event)">
                <span mat-line>STUDENTS</span>
                <span class="gray" mat-line>Go to the students page</span>
            </a>

            <a href="/contracts" mat-list-item routerLink="contracts" (click)="openLink($event)">
                <span mat-line>CONTRACTS</span>
                <span class="gray" mat-line>Go to the contracts page</span>
            </a>

            <a href="/certificates" mat-list-item routerLink="certificates" (click)="openLink($event)">
                <span mat-line>CERTIFICATES</span>
                <span class="gray" mat-line>Go to the certificates page</span>
            </a>

            <a href="/courses" mat-list-item routerLink="courses" (click)="openLink($event)">
                <span mat-line>COURSES</span>
                <span class="gray" mat-line>Go to the courses page</span>
            </a>

            <a href="/instructors" mat-list-item routerLink="instructors" (click)="openLink($event)">
                <span mat-line>INSTRUCTORS</span>
                <span class="gray" mat-line>Go to the instructors page</span>
            </a>

        </mat-nav-list>

    `,
    styles: [`
        .gray {
            color: gray;
        }
    `]
})
export class ButtonSheetComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<ButtonSheetComponent>) {
    }

    openLink(event: MouseEvent) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }


    ngOnInit(): void {
    }

}
