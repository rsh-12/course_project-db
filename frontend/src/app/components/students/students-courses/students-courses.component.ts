import {Component, Input, OnInit} from '@angular/core';

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

    @Input() loadStudentsWithoutContracts = true;

    loading = false;
    data: StudentsWithCourses[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.loadStudentsWithoutContracts
            ? this.retrieveStudentsWithoutContracts()
            : this.retrieveStudentsWithoutCertificates();
    }

    private retrieveStudentsWithoutContracts() {

    }

    private retrieveStudentsWithoutCertificates() {

    }
}
