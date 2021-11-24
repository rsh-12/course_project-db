import {Component, OnInit} from '@angular/core';
import {InstructorService} from "../../../services/instructor.service";
import {Instructor} from "../../../common/instructor";
import {CourseService} from "../../../services/course.service";
import {NotificationService} from "../../../services/notification.service";
import {Course} from "../../../common/course";

@Component({
    selector: 'app-instructors-list',
    templateUrl: './instructors-list.component.html',
    styleUrls: ['./instructors-list.component.css']
})
export class InstructorsListComponent implements OnInit {

    instructors: Instructor[] = [];
    currentInstructor: Instructor = {
        id: 0
    };

    courses: Map<number, Course[]> = new Map<number, Course[]>();

    loading = false;
    loadingCourses = false;
    currentIndex = -1;
    instructorName = '';

    constructor(private instructorService: InstructorService,
                private courseService: CourseService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveInstructors();
    }

    private retrieveInstructors() {
        this.instructorService.findAll().subscribe(
            data => {
                this.instructors = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false
        );
    }

    setActiveInstructor(instructor: Instructor, i: number) {
        this.currentIndex = i;
        this.currentInstructor = instructor;
    }

    confirmDeletion() {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteInstructor();
            });
    }

    deleteInstructor() {
        if (!this.currentInstructor.id) return;
        this.loading = true;

        this.instructorService.delete(this.currentInstructor.id).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('The instructor deleted successfully');
                this.refreshList();
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar('Something went wrong');
            },
            () => this.loading = false
        );
    }

    loadRelatedCourses() {
        if (!this.currentInstructor.id) return;

        this.loadingCourses = true;

        this.courseService.findAll(this.currentInstructor.id).subscribe(
            data => {
                console.log(data)
                this.courses.set(this.currentIndex, data)
                this.notificationService.openSnackBar(`${data.length} related objects found`);
            }, e => {
                console.log(e);
                this.notificationService.openSnackBar(e.error.message);
            },
            () => this.loadingCourses = false
        );

    }

    searchByName() {
        this.loading = true;
        this.currentInstructor = {};
        this.currentIndex = -1

        this.instructorService.findByName(this.instructorName).subscribe(
            data => {
                this.instructors = data;
                this.instructorName = '';
                this.notificationService.openSnackBar(`${data.length} objects found`, 2000);
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar('Something went wrong');
            },
            () => this.loading = false
        );
    }

    private refreshList() {
        this.currentInstructor = {};
        this.currentIndex = -1
        this.retrieveInstructors();
    }
}
