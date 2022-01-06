import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {Contract} from "../../../common/contract";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'app-contracts-list',
    templateUrl: './contracts-list.component.html',
    styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

    contracts: Contract[] = [];
    loading = false;
    loadStudents = false;
    dataSource!: MatTableDataSource<Contract>;
    displayedColumns: string[] = ['company', 'lastName', 'firstName', 'course', 'conclusion', 'action'];

    constructor(private commonService: CommonService,
                private notificationService: NotificationService) {
    }

    @ViewChild(MatPaginator, {static: false})
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild(MatSort, {static: false})
    set sort(value: MatSort) {
        if (this.dataSource) {
            this.dataSource.sort = value;
        }
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveContracts();
    }

    private retrieveContracts() {
        this.commonService.getContracts().subscribe(
            data => {
                console.log(data)
                this.contracts = data;
                this.dataSource = new MatTableDataSource<Contract>(data)
            }, error => this.handleError(error),
            () => this.loading = false
        );
    }

    confirmDeletion(id: number | string) {
        this.notificationService.openDialog().afterClosed().subscribe(
            res => {
                if (res) this.deleteContract(id);
            }
        )
    }

    private deleteContract(id: number | string) {
        this.loading = true;

        this.commonService.deleteContract(id).subscribe(
            res => {
                console.log(res);
                this.notificationService.successfullyDeleted();
                this.retrieveContracts();
            }, error => this.handleError(error),
            () => this.loading = false
        );
    }

    private handleError(defaultErrorMsg: string, errorMsg?: string) {
        let message = errorMsg ? errorMsg : defaultErrorMsg
        this.notificationService.openSnackBar(message);
        this.loading = false;
    }

}
