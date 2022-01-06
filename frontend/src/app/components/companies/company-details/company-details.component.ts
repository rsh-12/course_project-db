import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Company} from "../../../common/company";
import {CompanyService} from "../../../services/company.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../services/utils.service";

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.css'],
    host: {
        '(keyup.escape)': 'this.back()'
    }
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
        this.isEditMode = UtilsService.isNumeric(id);

        if (this.isEditMode) {
            this.getCompanyById(id);
        } else {
            this.router.navigate(['companies/add']).then();

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

        this.isEditMode
            ? this.update()
            : this.add();
    }

    private update() {
        if (!this.currentCompany.id) return;

        this.loading = true;
        this.companyService.update(this.currentCompany.id, JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Company updated successfully');
            }, error => this.handleError(error),
            () => this.loading = false
        );
    }

    private add() {
        this.loading = true;

        this.companyService.add(JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Company created successfully');
            }, error => this.handleError(error),

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
            }, error => this.handleError(error),
            () => {
                this.initFormGroup();
                return this.loading = false;
            }
        );
    }

    private initFormGroup() {
        this.form = this.formBuilder.group({
            id: [this.currentCompany.id],
            name: [this.currentCompany.name, UtilsService.commonValidators(3, 30)],
            description: [this.currentCompany.description, UtilsService.commonValidators(5, 120)],
        });
    }

    back() {
        this.router.navigate(['/companies']).then();
    }

    onReset() {
        this.submitted = false;
        this.form.reset();
    }

    private handleError(defaultErrorMsg: string, errorMsg?: string) {
        let message = errorMsg ? errorMsg : defaultErrorMsg
        this.notificationService.openSnackBar(message);
        this.loading = false;
    }

}
