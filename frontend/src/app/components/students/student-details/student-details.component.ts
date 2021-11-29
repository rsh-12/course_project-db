import {Component, OnInit} from '@angular/core';
import {Student} from "../../../common/student";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../../services/student.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../../services/company.service";
import {CommonService} from "../../../services/common.service";
import {Company} from "../../../common/company";

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

    loading: boolean = false;
    loadingCompany: boolean = false;
    submitted: boolean = false;
    isEditMode: boolean = false;

    currentStudent: Student = {};
    currentCompany: Company = {};
    companies: Company[] = [];

    form!: FormGroup;
    currentIndex: number = -1;
    maxDate: Date = new Date(new Date().getFullYear() - 18, new Date().getMonth() + 1);
    minDate: Date = new Date(new Date().getFullYear() - 70, new Date().getMonth() + 1);

    constructor(private studentService: StudentService,
                private companyService: CompanyService,
                public commonService: CommonService,
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

        this.currentCompany = {};
        this.currentIndex = -1;

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
            companyId: [this.currentStudent.companyId]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;

        if (!this.f['companyId'].value) {
            this.notificationService.openSnackBar('Please choose a company');
            return;
        }

        this.isEditMode ? this.update() : this.add();
    }

    private add() {
        this.loading = true;

        this.studentService.add(JSON.stringify(this.form.value)).subscribe(
            data => {
                console.log(data);
                this.currentStudent = data;
                this.notificationService.openSnackBar('Student created successfully');
                this.back();
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
                this.loading = false
            },
            () => this.loading = false
        );
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

    loadRelatedCompany() {
        if (!this.currentStudent.companyId) return;

        this.loadingCompany = true;
        this.companyService.findById(this.currentStudent.companyId).subscribe(
            data => {
                console.log(data)
                this.currentCompany = data;
            },
            err => {
                this.loadingCompany = false;
                console.log(err);
                this.notificationService.unknownError();
            },
            () => this.loadingCompany = false
        );
    }

    loadCompanies() {
        this.loadingCompany = true;
        this.currentIndex = -1;

        this.companyService.findAll().subscribe(
            data => {
                console.log(data);
                this.companies = data;
            }, err => {
                console.log(err);
                this.notificationService.unknownError();
                this.loadingCompany = false;
            },
            () => this.loadingCompany = false
        );
    }

    setActiveCompany(company: Company, i: number) {
        this.currentIndex = i;
        this.currentCompany = company;
        this.currentStudent.companyId = company.id;
        this.form.controls['companyId'].setValue(company.id);

        console.log(this.form.value)
    }

}
