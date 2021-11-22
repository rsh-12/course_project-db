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
    public name = '';
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
            }, error => {
                this.totalCourses = 0;
                console.log(error);
            },
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

        this.courseService.findByName(this.name).subscribe(
            data => {
                this.totalCourses = data.length
                this.courses = data;
                this.name = ''
            }, error => {
                console.log(error);
            },
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
                    this.notificationService.openSnackBar('The course deleted successfully')
                },
                error => {
                    console.log(error);
                    this.notificationService.openSnackBar(error.error.message);
                },
                () => this.loading = false
            );
        }
    }

}
