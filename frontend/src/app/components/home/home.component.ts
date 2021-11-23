import {Component, OnInit} from '@angular/core';
import {Income} from "../../common/income";
import {CommonService} from "../../services/common.service";
import {NotificationService} from "../../services/notification.service";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    income: Income[] = [];
    loading = false;
    panelOpenState = false;

    constructor(private commonService: CommonService,
                private studentService: StudentService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveIncomeInfo();
    }

    private retrieveIncomeInfo() {
        this.commonService.getIncome().subscribe(
            data => {
                this.income = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false
        );
    }

    showStudentsWithoutContracts() {
        this.studentService.findWithoutContracts().subscribe(
            data => {
                console.log(data);
                this.notificationService.openDialogWithData(data);
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
            }
        );
    }

}
