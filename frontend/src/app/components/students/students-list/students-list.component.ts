import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Student} from "../../../common/student";

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

    constructor(private studentService: StudentService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveStudents();
    }

    private retrieveStudents() {
        this.studentService.findAll().subscribe(
            data => {
                this.students = data;
                this.loading = false;
            }, error => {
                console.log(error);
                this.loading = false;
            }
        );
    }

    setActiveStudent(student: Student, i: number) {
        this.currentIndex = i;
        this.currentStudent = student;
    }

    confirmDeletion() {

    }
}
