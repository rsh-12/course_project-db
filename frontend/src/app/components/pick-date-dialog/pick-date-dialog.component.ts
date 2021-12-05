import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface ContractDates {
    conclusionDate?: Date;
    completionDate?: Date;
}

export interface CertificateDates {
    dateOfIssue?: Date;
}


@Component({
    selector: 'app-pick-date-dialog',
    templateUrl: './pick-date-dialog.component.html',
    styleUrls: ['./pick-date-dialog.component.css']
})
export class PickDateDialogComponent {

    currentDate: Date = new Date();

    constructor(public dialogRef: MatDialogRef<PickDateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
