import {Component, OnInit} from '@angular/core';
import {Course} from "../../../common/course";
import {CourseService} from "../../../services/course-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Instructor} from "../../../common/instructor";
import {CourseById} from "../../../common/courseById";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

    course: Course = {
        name: '',
        category: '',
        description: '',
        hours: 0,
        startDate: new Date(),
        endDate: new Date(),
        price: 0.00
    }

    instructors: Instructor[] = [];
    currentInstructor: Instructor = {};
    totalStudents = 0;

    response: CourseById = {
        course: this.course,
        instructors: this.instructors,
        totalStudents: this.totalStudents
    }

    message = '';

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.message = '';
        this.getCourseById(this.route.snapshot.params.id);
    }

    private getCourseById(id: string) {
        this.courseService.findById(id).subscribe(
            data => {
                this.response = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        )
    }

    setActiveInstructor(instructor: Instructor) {
        this.currentInstructor = instructor;
    }
}
