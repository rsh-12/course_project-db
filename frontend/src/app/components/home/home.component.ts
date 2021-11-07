import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common-service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    content?: string;
    errorMessage = '';

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.commonService.getStatistics().subscribe(
            data => {
                console.log(data)
            },
            err => {
                console.log(err.error.message);
                this.errorMessage = err.error.message;
            }
        )
    }

}
