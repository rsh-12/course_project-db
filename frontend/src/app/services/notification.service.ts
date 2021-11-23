import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";
import {DialogDataComponent} from "../components/dialog-data/dialog-data.component";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    openSnackBar(message: string, duration: number = 5000) {
        this.snackBar.open(message, 'close', {duration: duration});
    }

    openDialog(): MatDialogRef<ConfirmDialogComponent> {
        return this.dialog.open(ConfirmDialogComponent);
    }

    openDialogWithData(data: any) {
        this.dialog.open(DialogDataComponent, {data, closeOnNavigation: true});
    }

}
