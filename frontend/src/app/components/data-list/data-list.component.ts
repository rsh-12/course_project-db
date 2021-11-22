import {Component, Input, OnInit} from '@angular/core';
import {InstructorService} from "../../services/instructor.service";
import {NotificationService} from "../../services/notification.service";
import {CommonData} from "../../common/commonData";

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
                private instructorService: InstructorService) {
    }

    ngOnInit(): void {
    }

    loadRelatedData() {
        this.loading = true;

        if (this.entityName === 'instructors') {
            this.instructorService.findByCourse(this.entityId).subscribe(
                res => {
                    this.data = res;
                    this.showData = this.isDataRelated = true;
                    this.notificationService.openSnackBar(res.length + ' objects found');
                }, err => {
                    console.log(err);
                    this.notificationService.openSnackBar(err.error.message);
                },
                () => this.loading = false
            );
        }
    }

    loadUnrelatedData() {
        this.loading = true;

        if (this.entityName === 'instructors') {
            this.instructorService.findExceptCourse(this.entityId).subscribe(
                res => {
                    this.data = res;
                    this.showData = true;
                    this.isDataRelated = false;
                    this.notificationService.openSnackBar(res.length + ' objects found');
                }, err => {
                    console.log(err);
                    this.notificationService.openSnackBar(err.error.message);
                },
                () => this.loading = false
            );
        }
    }

    removeFromCourse() {
        const instructorIds = this.collectDataIds();

        if (instructorIds.length) {
            this.loading = true;

            this.instructorService.removeFromCourse(this.entityId, {ids: instructorIds}).subscribe(
                res => {
                    console.log(res);
                    this.notificationService.openSnackBar('Successfully removed from course');
                    this.showData = false;
                }, err => {
                    console.log(err);
                    this.notificationService.openSnackBar(err.error.message);
                    this.loading = false;
                },
                () => this.loading = false
            );
        } else {
            this.notificationService.openSnackBar('Nothing to remove')
        }
    }

    addToCourse() {
        const instructorIds = this.collectDataIds();

        if (instructorIds.length) {
            this.loading = true;

            this.instructorService.addToCourse(this.entityId, {ids: instructorIds}).subscribe(
                res => {
                    console.log(res);
                    this.notificationService.openSnackBar('Successfully added to course');
                    this.showData = false;
                }, err => {
                    console.log(err);
                    this.notificationService.openSnackBar(err.error.message);
                    this.loading = false;
                },
                () => this.loading = false
            );
        } else {
            this.notificationService.openSnackBar('Nothing to add');
        }
    }

    private collectDataIds() {
        return this.data
            .filter(d => d.checked)
            .map(value => value.id);
    }
}
