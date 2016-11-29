'use strict';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {RepoInfo} from "../commons/model/RepoInfo";

@Injectable()
export class ApiService {
    private BASE_URL: string;
    options: RequestOptions;

    constructor(private http: Http) {
        var isDevMode: boolean = window.location.port === "3000";
        var port = (isDevMode ? 8080 : window.location.port);
        this.BASE_URL = window.location.protocol + '//' + window.location.hostname + ":" + port  + "/";
        this.options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' })});
    }

    search(terms: string): Observable<Response> {
        return this.http.get(this.BASE_URL + 'blame?terms=' + terms);
    }

    scan(repoInfo: RepoInfo): Observable<Response> {
        let body = JSON.stringify(repoInfo);
        return this.http.post(this.BASE_URL + 'repo-scan', body, this.options);
    }

    getRepoUrl(): Observable<Response> {
      return this.http.get(this.BASE_URL + 'repo-check');
    }
}
