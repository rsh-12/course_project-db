import {Component, OnInit} from '@angular/core';
import {Course} from "../../../common/course";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Instructor} from "../../../common/instructor";
import {CourseById} from "../../../common/courseById";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

    submitted = false;
    currentCourse: Course = {}
    instructors: Instructor[] = [];
    currentInstructor: Instructor = {};
    totalStudents = 0;

    response: CourseById = {
        course: {},
        instructors: [],
        totalStudents: 0
    }

    message = '';
    errorMessage: string | undefined;

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.message = '';

        this.getCourseById(this.route.snapshot.params.id);
    }

    onSubmit() {
        this.submitted = true;

        console.log('request sent')
        this.updateCourse();
    }

    onReset() {
        this.submitted = false;
    }

    private getCourseById(id: string) {
        this.courseService.findById(id).subscribe(
            data => {
                this.response = data;
                this.currentCourse = this.response.course;
            }, error => {
                console.log(error);
            }
        )
    }

    setActiveInstructor(instructor: Instructor) {
        this.currentInstructor = instructor;
    }

    updateCourse() {
        if (this.currentCourse.id != null) {

            this.courseService.update(this.currentCourse.id, this.currentCourse).subscribe(
                res => {
                    console.log(res);
                    this.message = 'The course was updated successfully';
                }, error => {
                    console.log(error);
                    this.errorMessage = error.error.message
                }
            );
        } else {
            console.log('id is null');
        }
    }

}
