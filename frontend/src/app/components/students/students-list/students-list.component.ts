import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Student} from "../../../common/student";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

    students: Student[] = [];
    loading = false;
    currentIndex = -1;
    currentStudent: Student = {};
    studentName = '';

    constructor(private studentService: StudentService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveStudents();
    }

    setActiveStudent(student: Student, i: number) {
        this.currentIndex = i;
        this.currentStudent = student;
    }

    confirmDeletion() {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteStudent();
            });
    }

    searchByName() {
        this.currentStudent = {};
        this.currentIndex = -1;
        this.loading = true;

        this.studentService.findByName(this.studentName).subscribe(
            data => {
                this.students = data;
                this.studentName = ''
                this.notificationService.openSnackBar(`${data.length} objects found`);
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    private deleteStudent() {
        if (!this.currentStudent.id) return;
        this.loading = true;

        this.studentService.delete(this.currentStudent.id).subscribe(
            res => {
                console.log(res);
                this.notificationService.successfullyDeleted();
            }, errorMsg => this.handleError(errorMsg),
            () => {
                this.loading = false;
                this.refreshList();
            }
        );
    }

    private retrieveStudents() {
        this.studentService.findAll().subscribe(
            data => this.students = data,
            errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    private refreshList() {
        this.currentStudent = {};
        this.currentIndex = -1;
        this.retrieveStudents();
    }

    private handleError(errorMsg: string) {
        this.notificationService.openSnackBar(errorMsg);
        this.loading = false;
    }

}
