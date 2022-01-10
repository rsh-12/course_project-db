import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {CertificateInfo} from "../../../common/certificateInfo";
import {NotificationService} from "../../../services/notification.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-certificates-list',
    templateUrl: './certificates-list.component.html',
    styleUrls: ['./certificates-list.component.css']
})
export class CertificatesListComponent implements OnInit {

    loading = false;
    displayedColumns: string[] = ['studentLastName', 'course', 'dateOfIssue', 'action'];
    dataSource!: MatTableDataSource<CertificateInfo>;
    loadStudents = false;

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
        this.retrieveCertificates();
    }

    private retrieveCertificates() {
        this.loading = true;

        this.commonService.getCertificates().subscribe(
            data => {
                console.log(data)
                this.dataSource = new MatTableDataSource<CertificateInfo>(data)
            }, error => this.handleError(error),
            () => this.loading = false
        );
    }

    downloadCertificate(id: any) {
        if (!id) {
            this.notificationService.unknownError();
            return;
        }

        window.open('http://localhost:8080/api/certificates/download/' + id);
    }

    confirmDeletion(id: number | string) {
        this.notificationService.openDialog().afterClosed()
            .subscribe(result => {
                if (result) this.deleteCertificate(id);
            });
    }

    private deleteCertificate(id: number | string) {
        this.loading = true;

        this.commonService.deleteCertificate(id).subscribe(
            res => {
                console.log(res);
                this.notificationService.successfullyDeleted();
                this.retrieveCertificates();
            }, err => this.handleError(err),
            () => this.loading = false
        );
    }

    private handleError(errorMsg: string) {
        this.notificationService.openSnackBar(errorMsg);
        this.loading = false;
    }

}
