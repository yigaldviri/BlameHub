'use strict';
import { Component }     from '@angular/core';
import { NgForm }    from '@angular/forms';
import { ApiService } from "../../services/apiService";
import { GroupsResult } from "../../commons/model/GroupsResult";

@Component({
    selector: 'blamehub-search',
    templateUrl: 'app/components/search/search.component.html',
    providers: [ApiService]
})

export class SearchComponent {

    terms: any = {term: ""}; // hack because Angular 2 form exception
    groupsResult: GroupsResult;
    inSearch: boolean;

    constructor(private apiService: ApiService) {
    }

    search(): void {
        if (this.inSearch) {
            return;
        }

        this.inSearch = true;
        this.apiService.search(this.terms.term)
            .subscribe(
                (data: any): void => {
                    var json = JSON.parse(data._body);
                    this.groupsResult = GroupsResult.fromJson(json[0]);
                },
                err => console.log(err),
                () => {
                    this.inSearch = false;
                    console.log('Request returned from server')
                }
            );
    }
}
