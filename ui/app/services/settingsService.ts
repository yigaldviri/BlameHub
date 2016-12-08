
'use strict';
import {ApiService} from "./apiService";
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {RepoInfo} from "../commons/model/RepoInfo";

@Injectable()
export class SettingsService {
    private REPO_URL: string;

    constructor(private apiService: ApiService) {}

    getRepoUrl(): Observable<string> {
        if(this.REPO_URL) {
            return Observable.of(this.REPO_URL);
        } else {
            return this.apiService.getRepoUrl()
                .map(res => <string> res.json().gitHubUrl)
                .do(data => {
                    return this.REPO_URL = data;
                });
        }
    }
}



