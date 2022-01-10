import {Component, OnInit} from '@angular/core';
import {Income} from "../../common/income";
import {CommonService} from "../../services/common.service";
import {NotificationService} from "../../services/notification.service";
import {StudentService} from "../../services/student.service";
import {DocumentCreator} from "./report-generator";
import {Packer} from "docx";
import {saveAs} from 'file-saver';
import {TotalRecords} from "../../common/totalRecords";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    income: Income[] = [];
    statistics: TotalRecords = {
        certificates: 0, companies: 0, contracts: 0, courses: 0, instructors: 0, students: 0
    };
    loading = false;
    panelOpenState = false;

    constructor(private commonService: CommonService,
                private studentService: StudentService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveIncomeInfo();
        this.commonService.getStatistics().subscribe(
            data => {
                this.statistics = data;
            }, errorMsg => this.handleError(errorMsg)
        )
    }

    private retrieveIncomeInfo() {
        this.commonService.getIncome().subscribe(
            data => {
                this.income = data;
            }, errorMsg => this.handleError(errorMsg),
            () => this.loading = false
        );
    }

    showStudentsWithoutContracts() {
        this.studentService.findWithoutContracts().subscribe(
            data => {
                console.log(data);
                this.notificationService.openDialogWithData({
                    students: data,
                    title: 'Students without contracts'
                });
            }, errorMsg => this.handleError(errorMsg)
        );
    }

    download() {
        const docCreator = new DocumentCreator();
        const doc = docCreator.create(this.income, this.statistics);

        Packer.toBlob(doc)
            .then((blob => {
                saveAs(blob, "statistics.docx");
                console.log("Document created successfully");
            }))
    }

    private handleError(errorMsg: string) {
        this.notificationService.openSnackBar(errorMsg);
        this.loading = false;
    }

}
