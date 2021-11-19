import {Component, OnInit} from '@angular/core';
import {Income} from "../../common/income";
import {CommonService} from "../../services/common-service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    income: Income[] = [];
    loading = false;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveCompanies();
    }

    private retrieveCompanies() {
        this.commonService.getIncome().subscribe(
            data => {
                this.income = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false
        );
    }
}
