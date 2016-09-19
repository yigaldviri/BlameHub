'use strict';
import { Component }     from '@angular/core';
import { NgForm }    from '@angular/forms';
import { MDL } from "../../MDL/MDL";
import { ApiService } from "../../services/apiService";
import { GroupsResult } from "../../commons/model/GroupsResult";

@Component({
    selector: 'blamehub-search',
    templateUrl:
        `
        <div mdl class="search-pane">
            <div class="search-bar">
                <form (ngSubmit)="search()"
                      class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input [(ngModel)]="terms.term"
                           [ngModelOptions]="{standalone: true}"
                           class="mdl-textfield__input"
                           type="text" autofocus
                           id="search-bar">
                    <label class="mdl-textfield__label" for="search-bar">Search...</label>
                </form>
            </div>

            <div mdl *ngIf="inSearch" style="padding: 60px;">
                    <div class="loading">Loading...</div>
                    <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="width: inherit;"></div>
            </div>
        </div>

<ul *ngIf="groupsResult && groupsResult.values.length > 0" class="results">

    <div class="results-title">Ok, you wan'a nail one of them:</div>
    <li *ngFor="let group of groupsResult.values" >
        <div class="committer">{{group.commitResult[0].name}}</div>
        <div class="commit" *ngFor="let commit of group.commitResult" >
            <span class="commit-date">In <i>{{getCommitDate(commit.date)}}</i> he committed</span>
            <span class="commit-score">(score: {{commit.score}})</span>
            <div class="commit-message">{{commit.message}}</div>
        </div>
    </li>
</ul>


<div *ngIf="groupsResult && groupsResult.values.length == 0" class="sharon-pane">
    <div class="sharon">
        <div class="sharon-name"><b>Nail it to Sharon!</b></div>
        <div class="sharon-reason">He's good at it. and he loves it as well.</div>
        <div class="sharon-reason">Contact him at
            <a href="#" style="color: #53bbd4">sharon.hophy@ca.com</a>.</div>

      <!--  <p align="center" style="margin-top: 15px">
            <img title="What up, yo?" src="../../resources/sharon.gif"/>
        </p>-->

        <iframe src="//giphy.com/embed/3oEjHAUOqG3lSS0f1C"
                width="480" height="360"></iframe>
    </div>
</div>
        `,
    providers: [ApiService],
    directives: [ MDL ]
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
                (err: any) => {
                    this.inSearch = false;
                    console.log(err);
                },
                () => {
                    this.inSearch = false;
                    console.log('Request returned from server')
                }
            );
    }

    getCommitDate(date: Date): string {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

}
