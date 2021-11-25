import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Student} from "../../common/student";

@Component({
    selector: 'app-dialog-data',
    template: `
        <div>
            <h1 mat-dialog-title>{{data.title}}</h1>
            <div mat-dialog-content class="card-block">
                <ul>
                    <li *ngFor="let d of data.students">
                        <a matDialogClose [routerLink]="['/students', d.id]">
                            {{d.lastName}} {{d.firstName}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    `,
    styles: [`
        ul {
            list-style-type: none;
        }

        a {
            text-decoration: none;
        }
    `]
})
export class DialogDataComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { students: Student[], title: '' }) {
    }

    ngOnInit(): void {
    }


}
