import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-pick-date-dialog',
    templateUrl: './pick-date-dialog.component.html',
    styleUrls: ['./pick-date-dialog.component.css']
})
export class PickDateDialogComponent {

    constructor(public dialogRef: MatDialogRef<PickDateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
