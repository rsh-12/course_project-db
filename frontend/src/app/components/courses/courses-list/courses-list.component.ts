import {Component, OnInit} from '@angular/core';
import {CourseInfo} from "../../../common/courseInfo";
import {CourseService} from "../../../services/course.service";

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

    courses?: CourseInfo[];
    totalCourses = 0;
    currentCourse: CourseInfo = {};
    currentIndex = -1;
    public name = '';

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.retrieveCourses();
    }

    private retrieveCourses() {
        this.courseService.findAll().subscribe(
            data => {
                this.totalCourses = data.length
                this.courses = data;
            }, error => {
                this.totalCourses = 0;
                console.log(error);
            }
        )
    }

    private refreshList() {
        this.retrieveCourses();
        this.currentCourse = {};
        this.currentIndex = -1;
    }

    searchByName() {
        this.currentCourse = {};
        this.currentIndex = -1;

        console.log('this.name: ' + this.name);

        this.courseService.findByName(this.name).subscribe(
            data => {
                this.totalCourses = data.length
                this.courses = data;
                this.name = ''
            }, error => {
                console.log(error);
            }
        )
    }

    setActiveCourse(course: CourseInfo, i: number) {
        this.currentCourse = course;
        this.currentIndex = i;
    }

}
