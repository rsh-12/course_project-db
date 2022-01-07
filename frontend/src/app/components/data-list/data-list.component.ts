import {Component, Input} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {CommonData} from "../../common/commonData";
import {Observable} from "rxjs";
import {InstructorService} from "../../services/instructor.service";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.css']
})
export class DataListComponent {

    @Input() entityId!: number;
    @Input() entityName!: string;

    data: CommonData[] = [];

    showData = false;
    isDataRelated = false;
    loading = false;

    constructor(private notificationService: NotificationService,
                private instructorService: InstructorService,
                private studentService: StudentService) {
    }

    loadRelatedData(isRelated: boolean) {
        this.loading = this.showData = true;
        this.isDataRelated = isRelated;

        let serviceMethod: Observable<any>;
        serviceMethod = this.defineLoadingMethod(isRelated, this.entityId, this.entityName);

        serviceMethod.subscribe(
            res => {
                this.data = res;
                this.notificationService.openSnackBar(res.length + ' objects found');
            }, errorMsg => this.handleError(errorMsg),
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
        serviceMethod = this.defineModifyingMethod(isAdding, this.entityId, this.entityName, {ids: entityIds});

        serviceMethod.subscribe(
            res => {
                console.log(res);
                this.notificationService.openSnackBar(message);
                this.showData = false;
            }, errorMsg => this.handleError(errorMsg),
            () => {
                this.loading = false;
                this.loadRelatedData(this.isDataRelated);
            }
        );
    }

    private collectDataIds() {
        return this.data.filter(d => d.checked).map(value => value.id);
    }

    // load data with specific service class
    defineLoadingMethod(isRelated: boolean, entityId: number, entityName: string) {
        const serviceClass = entityName === 'instructors' ? this.instructorService : this.studentService;

        return isRelated
            ? serviceClass.findByCourse(entityId)
            : serviceClass.findExceptCourse(entityId);
    }

    // modify data with specific service class
    defineModifyingMethod(isAdding: boolean, entityId: number, entityName: string, data: { ids: number[] }) {
        const serviceClass = entityName === 'instructors' ? this.instructorService : this.studentService;

        return isAdding
            ? serviceClass.addToCourse(entityId, data)
            : serviceClass.removeFromCourse(entityId, data);
    }

    private handleError(defaultErrorMsg: string, errorMsg?: string) {
        let message = errorMsg ? errorMsg : defaultErrorMsg
        this.notificationService.openSnackBar(message);
        this.loading = false;
    }

}
