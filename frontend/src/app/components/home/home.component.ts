import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common-service";
import {Statistics} from "../../common/statistics";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    errorMessage = '';
    stats!: Statistics;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.commonService.getStatistics().subscribe(
            data => this.stats = data,
            err => {
                console.log(err.error.message);
                this.errorMessage = err.error.message;
            }
        )
    }

}
