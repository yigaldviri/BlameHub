'use strict';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ApiService {
    base: string;

    constructor(private http: Http) {
        var serverPath: string = '/blamehub/',
            isProdMode: boolean = window.location.pathname == serverPath,
            suffix: string = isProdMode ? serverPath : '/';

        this.base = window.location.hostname + ":" + "8080/blamehub" + suffix;
    }

    search(terms: string): Observable<Response> {
        return this.http.get(window.location.protocol + '//' + this.base + 'search?terms=' + terms);
    }
}