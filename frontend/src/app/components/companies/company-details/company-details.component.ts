import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Company} from "../../../common/company";
import {CompanyService} from "../../../services/company.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UtilsService} from "../../../services/utils.service";
import {isNumeric} from "rxjs/internal-compatibility";
import {Title} from "@angular/platform-browser";

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
                private router: Router,
                private title: Title) {
        title.setTitle('Company');
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const pathVariable = params['id'];
            if (isNumeric(pathVariable)) {
                this.getCompanyById(pathVariable);
                return;
            }
            this.initFormGroup();
        });
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
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    private add() {
        this.loading = true;

        this.companyService.add(JSON.stringify(this.form.value)).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('Company created successfully');
            }, errorMsg => this.handleError(errorMsg),

            () => {
                this.back();
                return this.loading = false;
            }
        );
    }

    private getCompanyById(id: string | number) {
        this.loading = true;

        this.companyService.findById(id).subscribe(
            data => {
                this.currentCompany = data;
            }, errorMsg => this.handleError(errorMsg),
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

    private handleError(errorMsg: string) {
        this.notificationService.openSnackBar(errorMsg);
        this.loading = false;
    }

}
