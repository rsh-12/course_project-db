import {Component} from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h2 mat-dialog-title>Warning!</h2>
        <mat-dialog-content class="mat-typography">
            <p>Are you sure you want to delete this object?</p>
            <p>After deletion, the object cannot be restored!</p>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
            <button mat-button [matDialogClose]="false" mat-dialog-close>Cancel</button>
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Delete</button>
        </mat-dialog-actions>
    `,
    styles: []
})
export class ConfirmDialogComponent {

}
