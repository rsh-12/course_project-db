import {Component, OnInit} from '@angular/core';
import {Student} from "../../../common/student";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../../services/student.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";
import {CommonService} from "../../../services/common.service";

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

    loading: boolean = false;
    submitted: boolean = false;
    isEditMode: boolean = false;

    currentStudent: Student = {};

    form!: FormGroup;

    constructor(private studentService: StudentService,
                private companyService: CompanyService,
                private notificationService: NotificationService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.isEditMode = CommonService.isNumeric(id);

        if (this.isEditMode) {
            this.getStudentById(id);
            return;
        }

        this.router.navigate(['students/add']);

        const currentDate = new Date();
        this.currentStudent = {
            lastName: '',
            firstName: '',
            dateOfBirth: new Date(currentDate.setFullYear(currentDate.getFullYear() - 18)),
            phone: '',
            email: ''
        };

        this.initFormGroup();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    private initFormGroup() {
        this.form = this.formBuilder.group({
            id: [this.currentStudent.id],
            lastName: [this.currentStudent.firstName, CommonService.commonValidators(2, 30)],
            firstName: [this.currentStudent.firstName, CommonService.commonValidators(2, 30)],
            dateOfBirth: [this.currentStudent.dateOfBirth, [Validators.required]],
            phone: [this.currentStudent.phone,
                [Validators.pattern('(\\+7|8)9(\\d{7,13})'), Validators.required,
                    Validators.minLength(8), Validators.maxLength(15)]],
            email: [this.currentStudent.email,
                [Validators.required, Validators.email,
                    Validators.minLength(5), Validators.maxLength(20)]],
            companyId: [this.currentStudent.companyId, [Validators.required]]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;

        this.isEditMode ? this.update() : this.add();
    }

    private add() {

    }

    private update() {
        if (!this.currentStudent.id) return;

        this.loading = true;
        this.studentService.update(this.currentStudent.id, JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Student updated successfully');
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
            },
            () => this.loading = false
        );

    }

    private getStudentById(id: string) {
        this.loading = true;

        this.studentService.findById(id).subscribe(
            data => {
                console.log(data);
                this.currentStudent = data;
            }, err => {
                console.log(err);
                this.notificationService.unknownError();
            },
            () => {
                this.initFormGroup();
                this.loading = false;
            }
        );
    }

    back() {
        this.router.navigate(['/students']);
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }

}
