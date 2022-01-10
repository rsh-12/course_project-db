import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../../services/student.service";
import {NotificationService} from "../../../services/notification.service";
import {CommonService} from "../../../services/common.service";
import {MatDialog} from "@angular/material/dialog";
import {PickDateDialogComponent} from "../../pick-date-dialog/pick-date-dialog.component";

export interface StudentsWithCourses {
    // courses_students
    id: number,

    // student
    studentId: number,
    lastName: string,
    firstName: string,

    // course
    courseId: number;
    course: string;
}

@Component({
    selector: 'app-students-courses',
    templateUrl: './students-courses.component.html',
    styleUrls: ['./students-courses.component.css']
})
export class StudentsCoursesComponent implements OnInit {

    @Input() data: string = '';
    loading = false;
    students: StudentsWithCourses[] = [];

    constructor(private route: ActivatedRoute,
                private studentService: StudentService,
                private commonService: CommonService,
                private dialog: MatDialog,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        if (this.data === 'certificates') {
            // get students without certificates

            this.retrieveStudentsWithout(this.data);
        } else if (this.data === 'contracts') {
            // get students without contracts
            this.retrieveStudentsWithout(this.data);
        }
    }

    openDialog(id: number) {
        let obj;
        const currentDate = new Date();
        this.data === 'contracts'
            ? obj = {
                conclusionDate: new Date(),
                completionDate:
                    new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
            }
            : obj = {
                dateOfIssue: new Date()
            };

        const dialogRef = this.dialog.open(PickDateDialogComponent, {data: obj});

        dialogRef.afterClosed().subscribe(res => {
            if (StudentsCoursesComponent.hasErrors(res)) {
                return;
            }

            this.add(id, {
                conclusionDate: res.conclusionDate,
                completionDate: res.completionDate,
                dateOfIssue: res.dateOfIssue
            });

        }, err => {
            console.log(err)
        })
    }

    private static hasErrors(res: any) {
        if (!res) return true;
        return (res.conclusionDate || res.completionDate) && res.conclusionDate >= res.completionDate;
    }

    private retrieveStudentsWithout(data: string) {

        this.loading = true;

        this.studentService.findWithCoursesWithout(data).subscribe(
            res => {
                console.log(res);
                this.students = res;
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    add(id: number, dates: { conclusionDate?: Date, completionDate?: Date, dateOfIssue?: Date }): void {
        let operation;
        if (this.data === 'certificates') {
            operation = this.commonService.addCertificate(id, dates);
        } else if (this.data === 'contracts') {
            operation = this.commonService.addContract(id, dates);
        } else return;

        this.loading = true;

        operation.subscribe(res => {
                console.log(res);
                this.notificationService.openSnackBar('Success');
                window.location.reload();
            },
            errorMsg => {
                this.handleError(errorMsg);
            },
            () => this.loading = false
        );
    }

    private handleError(defaultErrorMsg: string, errorMsg?: string) {
        let message = errorMsg ? errorMsg : defaultErrorMsg
        this.notificationService.openSnackBar(message);
        this.loading = false;
    }

}
