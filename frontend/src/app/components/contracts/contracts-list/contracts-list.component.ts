import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common-service";
import {Contract} from "../../../common/contract";

@Component({
    selector: 'app-contracts-list',
    templateUrl: './contracts-list.component.html',
    styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit {

    contracts: Contract[] = [];
    loading = false;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.retrieveContracts();
        this.loading = false;

    }

    private retrieveContracts() {
        this.commonService.getContracts().subscribe(
            data => {
                this.contracts = data;
            }, error => {
                console.log(error);
            }
        )
    }
}
