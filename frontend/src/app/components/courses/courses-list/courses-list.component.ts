import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {NotificationService} from "../../../services/notification.service";
import {Course} from "../../../common/course";

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

    courses?: Course[];
    totalCourses = 0;
    currentCourse: Course = {};
    currentIndex = -1;
    courseName = '';
    loading = false;

    constructor(private courseService: CourseService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.retrieveCourses();
    }

    private retrieveCourses() {
        this.loading = true;

        this.courseService.findAll().subscribe(
            data => {
                this.totalCourses = data.length
                this.courses = data;
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    private refreshList() {
        this.retrieveCourses();
        this.currentCourse = {};
        this.currentIndex = -1;
    }

    searchByName() {
        this.loading = true;
        this.currentCourse = {};
        this.currentIndex = -1;

        this.courseService.findByName(this.courseName).subscribe(
            data => {
                this.totalCourses = data.length
                this.courses = data;
                this.courseName = '';
                this.notificationService.openSnackBar(`${this.totalCourses} objects found`);
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    setActiveCourse(course: Course, i: number) {
        this.currentCourse = course;
        this.currentIndex = i;
    }

    confirmDeletion() {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteCourse();
            });
    }

    deleteCourse() {
        this.loading = true;

        if (this.currentCourse.id != null) {
            this.courseService.delete(this.currentCourse.id).subscribe(
                res => {
                    console.log(res);
                    this.refreshList();
                    this.notificationService.successfullyDeleted();
                },
                errorMsg => this.handleError(errorMsg),
                () => this.loading = false
            );
        }
    }

    private handleError(errorMsg: string) {
        this.notificationService.openSnackBar(errorMsg);
        this.loading = false;
    }

}
