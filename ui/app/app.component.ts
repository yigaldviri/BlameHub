import { Component, } from '@angular/core';
import {MDL} from "./MDL/MDL";
import {SearchComponent} from "./components/search/search.component";

@Component({
    selector: 'my-app',
    templateUrl: "app/app.component.html",
    directives: [ MDL, SearchComponent ]
})
export class AppComponent { }
