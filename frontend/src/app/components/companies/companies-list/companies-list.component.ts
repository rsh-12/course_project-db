import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company-service";
import {Company} from "../../../common/company";

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {
    companies?: Company[];

    constructor(private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.retrieveCompanies();
    }

    private retrieveCompanies() {
        this.companyService.findAll().subscribe(
            data => {
                console.log(data);
                this.companies = data;
            }, error => {
                console.log(error);
            }
        );
    }

}
