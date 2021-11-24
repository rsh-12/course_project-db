import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {CommonData} from "../../common/commonData";
import {Observable} from "rxjs";
import {CommonService} from "../../services/common.service";

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

    @Input() entityId!: number;
    @Input() entityName!: string;

    data: CommonData[] = [];

    showData = false;
    isDataRelated = false;
    loading = false;

    constructor(private notificationService: NotificationService,
                private commonService: CommonService) {
    }

    ngOnInit(): void {
    }

    loadRelatedData(isRelated: boolean) {
        this.loading = this.showData = true;
        this.isDataRelated = isRelated;

        let serviceMethod: Observable<any>;
        serviceMethod = this.commonService.defineLoadingMethod(isRelated, this.entityId, this.entityName);

        serviceMethod.subscribe(
            res => {
                this.data = res;
                this.notificationService.openSnackBar(res.length + ' objects found');
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
            },
            () => this.loading = false
        );
    }

    moveData(isAdding: boolean) {
        const entityIds = this.collectDataIds();
        if (!entityIds.length) {
            this.notificationService.openSnackBar('First choose something');
            return;
        }

        this.loading = true;
        let message = isAdding ? 'Successfully added to course' : 'Successfully removed from course';

        let serviceMethod: Observable<any>;
        serviceMethod = this.commonService
            .defineModifyingMethod(isAdding, this.entityId, this.entityName, {ids: entityIds});

        serviceMethod.subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar(message);
                this.showData = false;
            }, err => {
                console.log(err);
                this.notificationService.openSnackBar(err.error.message);
                this.loading = false;
            },
            () => {
                this.loading = false;
                this.loadRelatedData(this.isDataRelated);
            }
        );
    }

    private collectDataIds() {
        return this.data.filter(d => d.checked).map(value => value.id);
    }

}
