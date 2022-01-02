import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Instructor} from "../../../common/instructor";
import {InstructorService} from "../../../services/instructor.service";
import {NotificationService} from "../../../services/notification.service";
import {UtilsService} from "../../../services/utils.service";

@Component({
    selector: 'app-instructor-details',
    templateUrl: './instructor-details.component.html',
    styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {

    loading = false;
    submitted = false;
    isEditMode = false;
    form!: FormGroup;

    currentInstructor: Instructor = {};

    constructor(private notificationService: NotificationService,
                private instructorService: InstructorService,
                private commonService: CommonService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.isEditMode = UtilsService.isNumeric(id);

        if (this.isEditMode) {
            this.getInstructorById(id);
            return;
        }

        this.router.navigate(['instructors/add']).then();

        this.currentInstructor = {
            lastName: '',
            firstName: '',
            education: '',
            degree: 'PhD'
        };

        this.initFormGroup();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;

        this.isEditMode ? this.update() : this.add();
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }

    back() {
        this.commonService.goToPage('/instructors')
    }

    private getInstructorById(id: number | string) {
        this.loading = true;

        this.instructorService.findById(id).subscribe(
            data => {
                console.log(data);
                this.currentInstructor = data;
            }, err => {
                console.log(err);
                this.notificationService.unknownError();
            }, () => {
                this.initFormGroup();
                this.loading = false;
            }
        )
    }

    private initFormGroup() {
        this.form = this.formBuilder.group({
            id: [this.currentInstructor.id],
            lastName: [this.currentInstructor.lastName, UtilsService.commonValidators(2, 30)],
            firstName: [this.currentInstructor.firstName, UtilsService.commonValidators(2, 30)],
            education: [this.currentInstructor.education, UtilsService.commonValidators(10, 150)],
            degree: [this.currentInstructor.degree, UtilsService.commonValidators(2, 30)],
        });
    }

    private update() {
        if (!this.currentInstructor.id) return;

        this.loading = true;
        this.instructorService.update(this.currentInstructor.id, JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Instructor updated successfully');
            }, err => {
                console.error(err);
                this.notificationService.unknownError();
                this.loading = false;
            }, () => this.loading = false
        );
    }

    private add() {
        this.loading = true;
        this.instructorService.add(JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Instructor added successfully');
                this.back();
            }, err => {
                console.error(err);
                this.notificationService.unknownError();
                this.loading = false;
            }, () => this.loading = false
        );
    }

}
