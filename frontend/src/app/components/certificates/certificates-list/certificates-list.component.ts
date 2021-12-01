import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {CertificateInfo} from "../../../common/certificateInfo";
import {NotificationService} from "../../../services/notification.service";

@Component({
    selector: 'app-certificates-list',
    templateUrl: './certificates-list.component.html',
    styleUrls: ['./certificates-list.component.css']
})
export class CertificatesListComponent implements OnInit {

    certificates: CertificateInfo[] = [];
    loading = false;

    constructor(private commonService: CommonService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveCertificates();
    }

    private retrieveCertificates() {
        this.commonService.getCertificates().subscribe(
            data => {
                console.log(data)
                this.certificates = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false);
    }

    downloadCertificate(id: any) {
        if (!id) {
            this.notificationService.unknownError();
            return;
        }

        window.open('http://localhost:8080/api/certificates/download/' + id);
    }
}
