'use strict';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {RepoInfo} from "../commons/model/RepoInfo";

@Injectable()
export class ApiService {
    base: string;
    options: RequestOptions;

    constructor(private http: Http) {
        var serverPath: string = '/blamehub/',
            isProdMode: boolean = window.location.pathname == serverPath,
            suffix: string = isProdMode ? serverPath : '/';

        this.base = window.location.hostname + ":" + "8080/blamehub" + suffix;
        this.options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' })});
    }

    search(terms: string): Observable<Response> {
        return this.http.get(window.location.protocol + '//' + this.base + 'search?terms=' + terms);
    }

    scan(repoInfo: RepoInfo): Observable<Response> {
        let body = JSON.stringify(repoInfo);
        return this.http.post(window.location.protocol + '//' + this.base + 'repo-scan', body, this.options);
    }
}