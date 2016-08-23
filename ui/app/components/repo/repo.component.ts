'use strict';
import { Component }     from '@angular/core';
import { Router }              from '@angular/router';
import { NgForm }    from '@angular/forms';
import { MDL } from "../../MDL/MDL";
import { ApiService } from "../../services/apiService";
import {RepoInfo} from "../../commons/model/RepoInfo";

@Component({
    selector: 'blamehub-repo',
    templateUrl: 'app/components/repo/repo.component.html',
    providers: [ApiService],
    directives: [ MDL ]
})

export class RepoComponent {

    private repoInfo = new RepoInfo();
    private scanning: boolean;
    private error: string;

    constructor(private apiService: ApiService,
                private router: Router) {
    }

    scan(): void {
        if (!this.validateFields()) {
            return;
        }

        this.scanning = true;
        this.apiService.scan(this.repoInfo)
            .subscribe(
                (): void => {
                    this.router.navigate(['/search']);
                },
                (err: any) => {
                   this.error= err;
                   this.scanning = false;
                },
                () => {
                    this.scanning = false;
                    console.log('Request returned from server')
                }
            );
    }

    validateFields(): boolean {
        return !!this.repoInfo.getRepoUrl();
    }

}
