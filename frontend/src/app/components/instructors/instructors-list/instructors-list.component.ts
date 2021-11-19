import {Component, OnInit} from '@angular/core';
import {InstructorService} from "../../../services/instructor.service";
import {Instructor} from "../../../common/instructor";

@Component({
    selector: 'app-instructors-list',
    templateUrl: './instructors-list.component.html',
    styleUrls: ['./instructors-list.component.css']
})
export class InstructorsListComponent implements OnInit {

    instructors: Instructor[] = [];
    loading = false;

    constructor(private instructorService: InstructorService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveInstructors();
    }

    private retrieveInstructors() {
        this.instructorService.findAll().subscribe(
            data => {
                this.instructors = data;
            }, error => {
                console.log(error);
            },
            () => this.loading = false
        );
    }
}
