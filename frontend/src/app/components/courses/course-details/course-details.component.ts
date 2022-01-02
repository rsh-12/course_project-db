import {Component, OnInit} from '@angular/core';
import {Course} from "../../../common/course";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Instructor} from "../../../common/instructor";
import {CourseById} from "../../../common/courseById";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {UtilsService} from "../../../services/utils.service";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

    loading = false;
    isEditMode = true;
    submitted = false;

    currentCourse: Course = {id: 0}
    currentInstructor: Instructor = {};
    totalStudents = 0;

    response: CourseById = {
        course: {},
        instructors: [],
        totalStudents: 0
    }

    form!: FormGroup;

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private notificationService: NotificationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loading = true;

        const id = this.route.snapshot.params.id;
        this.isEditMode = /^\d+$/.test(id);

        if (this.isEditMode) {
            this.getCourseById(id);
        } else {
            this.router.navigate(['courses/add']).then();

            const currentDate = new Date();
            this.currentCourse = {
                name: '',
                category: '',
                description: '',
                hours: 0,
                price: 0,
                startDate: new Date(),
                endDate: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
            }

            this.initFormGroup();
            this.loading = false;
        }
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        if (this.isEditMode) {
            this.updateCourse();
        } else {
            this.addCourse();
        }
    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }

    private getCourseById(id: string) {
        this.courseService.findById(id).subscribe(
            data => {
                this.response = data;
                this.currentCourse = this.response.course;
            }, error => {
                console.log(error);
            },
            () => {
                this.initFormGroup();
                this.loading = false;
            },
        );
    }

    setActiveInstructor(instructor: Instructor) {
        this.currentInstructor = instructor;
    }

    private updateCourse() {
        if (this.currentCourse.id != null) {
            this.courseService.update(this.currentCourse.id, JSON.stringify(this.form.value)).subscribe(
                res => {
                    console.log(res);
                    this.notificationService.openSnackBar('Course updated successfully');
                }, error => {
                    console.log(error);
                    this.notificationService.openSnackBar(error.error.message);
                },
                () => this.loading = false
            );
        }
    }

    private addCourse() {
        this.courseService.add(JSON.stringify(this.form.value)).subscribe(
            res => {
                this.currentCourse = res;
                this.notificationService.openSnackBar('Course created successfully')
            }, error => {
                console.log(error);
                this.notificationService.openSnackBar(error.error.message);
            },
            () => {
                this.back();
                return this.loading = false;
            }
        );
    }

    // initialize the form values, set some validation
    private initFormGroup() {
        this.form = this.formBuilder.group({
            id: [this.currentCourse.id],
            name: [this.currentCourse.name?.trim(), UtilsService.commonValidators()],
            category: [this.currentCourse.category?.trim(), UtilsService.commonValidators()],
            description: [this.currentCourse.description, UtilsService.commonValidators(5, 250)],
            hours: [this.currentCourse.hours,
                [Validators.required, Validators.min(10), Validators.max(1000)]],
            price: [this.currentCourse.price,
                [Validators.required, Validators.min(0), Validators.max(1000000)]],
            startDate: [this.currentCourse.startDate, Validators.required],
            endDate: [this.currentCourse.endDate, Validators.required]
        });
    }

    back() {
        this.router.navigate(['/courses']).then()
    }
}
