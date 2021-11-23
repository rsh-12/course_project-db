import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-data',
    template: `
        <div>
            <h1 mat-dialog-title>Students without contracts</h1>
            <div mat-dialog-content class="card-block">
                <ul>
                    <li *ngFor="let d of data">
                        <a matDialogClose [routerLink]="['/courses', d.id]">
                            {{d.lastName}} {{d.firstName}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    `,
    styles: [`
        .card-block {
            max-height: 200px;
            overflow: auto;
        }

        ul {
            list-style-type: none;
        }

        a {
            text-decoration: none;
        }
    `]
})
export class DialogDataComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
    }


}
