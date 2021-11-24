import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Company} from "../../../common/company";
import {CompanyService} from "../../../services/company.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

    loading: boolean = false;
    submitted: boolean = false;
    isEditMode: boolean = false;

    currentCompany: Company = {};

    form!: FormGroup;

    constructor(private companyService: CompanyService,
                private notificationService: NotificationService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.isEditMode = /^\d+$/.test(id);

        if (this.isEditMode) {
            this.getCompanyById(id);
        } else {
            this.router.navigate(['companies/add']);

            this.currentCompany = {
                name: '',
                description: ''
            };

            this.initFormGroup();
        }

    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;

        this.loading = true;

        this.isEditMode
            ? this.update()
            : this.add();
    }

    private update() {

    }

    private add() {
        this.loading = true;

        this.companyService.add(JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Company created successfully');
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
            },

            () => {
                this.back();
                return this.loading = false;
            }
        );

    }

    private getCompanyById(id: string) {
        this.loading = true;

        this.companyService.findById(id).subscribe(
            data => {
                this.currentCompany = data;
            }, err => {
                console.log(err);
                this.notificationService.unknownError();
            },
            () => this.loading = false
        );
    }

    private initFormGroup() {
        this.form = this.formBuilder.group({
            id: [this.currentCompany.id],
            name: [this.currentCompany.name, CommonService.commonValidators(3, 30)],
            description: [this.currentCompany.description, CommonService.commonValidators(5, 120)],
        });
    }

    back() {
        this.router.navigate(['/companies']);
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }
}
