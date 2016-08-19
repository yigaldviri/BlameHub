import { Component, } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MDL} from "./MDL/MDL";
import {SearchComponent} from "./components/search/search.component";

@Component({
    selector: 'my-app',
    templateUrl: "app/app.component.html",
    directives: [ MDL, ROUTER_DIRECTIVES, SearchComponent ]
})
export class AppComponent { }
