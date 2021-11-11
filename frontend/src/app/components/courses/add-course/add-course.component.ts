import {Component, OnInit} from '@angular/core';
import {Course} from "../../../common/course";
import {CourseService} from "../../../services/course-service";

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

    course: Course = {
        name: '',
        category: '',
        description: '',
        hours: 50,
        startDate: new Date(),
        endDate: undefined,
        price: 1000
    };

    submitted = false;

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
    }

    save() {
        const data = {
            name: this.course.name,
            category: this.course.category,
            description: this.course.description,
            hours: this.course.hours,
            startDate: this.course.startDate,
            endDate: this.course.endDate,
            price: this.course.price,
        }

    }

    new() {
        this.submitted = false;
        this.course = {
            name: ''
        }
    }

}
