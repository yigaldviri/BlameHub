'use strict';
import { Component }     from '@angular/core';
import { Router }              from '@angular/router';
import { NgForm }    from '@angular/forms';
import { MDL } from "../../MDL/MDL";
import { ApiService } from "../../services/apiService";
import {RepoInfo} from "../../commons/model/RepoInfo";

@Component({
    selector: 'blamehub-repo',
    template:
        `
        <div mdl class="search-pane">

        <div class="repo-page-desc">So, we're gonna clone you'r repository and then index it into Solr</div>

        <div class="search-bar">
            <form (ngSubmit)="scan()" #scanForm="ngForm"
                  class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                  style="width: 100%">

                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label repo-input" style="width: 100%">
                    <input [(ngModel)]="repoInfo.repoUrl" name="repoUrl"
                           class="mdl-textfield__input"
                           type="text" autofocus required
                           id="repoUrl">
                    <label class="mdl-textfield__label" for="repoUrl">Repository URL</label>
                </div>
                <div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label repo-input" style="width: 45%">
                        <input [(ngModel)]="repoInfo.repoUsername" name="repoUsername"
                               class="mdl-textfield__input"
                               type="text"
                               id="repoUsername">
                        <label class="mdl-textfield__label" for="repoUsername">Username</label>
                    </div>
                    <div class="splitter"></div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label repo-input" style="width: 45%">
                        <input [(ngModel)]="repoInfo.repoPassword" name="repoPassword"
                               class="mdl-textfield__input"
                               type="password"
                               id="repoPassword">
                        <label class="mdl-textfield__label" for="repoPassword">Password</label>
                    </div>
                </div>

                <div class="mdl-dialog__actions" style="margin-top: 30px">
                    <button (click)="scan()" [disabled]="!scanForm.form.valid || scanning"
                            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                        SCAN
                    </button>
                </div>
            </form>
    </div>

    <div mdl *ngIf="scanning" style="padding: 60px;">
        <div class="loading">Right now we are cloning your repository and then we will index it.</div>
        <div class="loading">That may take a few minutes...</div>
        <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="width: inherit;"></div>
    </div>
</div>

        `,
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
