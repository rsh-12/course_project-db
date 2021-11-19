import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {CourseInfo} from "../../../common/courseInfo";
import {CertificateInfo} from "../../../common/certificateInfo";

@Component({
    selector: 'app-certificates-list',
    templateUrl: './certificates-list.component.html',
    styleUrls: ['./certificates-list.component.css']
})
export class CertificatesListComponent implements OnInit {

    certificates: CertificateInfo[] = [];
    loading = false;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveCertificates();
    }

    private retrieveCertificates() {
        this.commonService.getCertificates().subscribe(
            data => {
                this.certificates = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false);
    }
}
