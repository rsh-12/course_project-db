import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company.service";
import {Company} from "../../../common/company";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

    companies?: Company[];
    currentCompany: Company = {};
    currentIndex = -1;
    loading = false;
    companyName: string = '';

    constructor(private companyService: CompanyService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveCompanies();
    }

    private retrieveCompanies() {
        this.companyService.findAll().subscribe(
            data => {
                console.log(data);
                this.companies = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false
        );
    }

    setActiveCourse(company: Company, i: number) {
        this.currentCompany = company;
        this.currentIndex = i;
    }

    confirmDeletion() {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteCompany();
            });
    }

    private deleteCompany() {
        if (!this.currentCompany.id) return;
        this.loading = true;

        this.companyService.delete(this.currentCompany.id).subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar('The company deleted successfully');
                this.refreshList();
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar('Something went wrong');
            },
            () => this.loading = false
        );
    }

    searchByName() {
        this.loading = true;
        this.currentCompany = {};
        this.currentIndex = -1;

        this.companyService.findByName(this.companyName).subscribe(
            data => {
                this.companies = data;
                this.companyName = '';
                this.notificationService.openSnackBar(`${data.length} objects found`);
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar('Something went wrong');
            },
            () => this.loading = false
        );
    }

    private refreshList() {
        this.currentCompany = {};
        this.currentIndex = -1;
        this.retrieveCompanies();
    }
}
