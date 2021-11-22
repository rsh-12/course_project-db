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
}
