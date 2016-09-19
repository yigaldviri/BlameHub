import { Component, } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MDL} from "./MDL/MDL";
import {SearchComponent} from "./components/search/search.component";

@Component({
    selector: 'my-app',
    template:
        `
        <div mdl>
            <header>
                <h1>BlameHub</h1>
                <p>
                    Nail the Job to some poor developer
                </p>
            </header>

        <main>
            <!-- Routed views go here -->
            <router-outlet></router-outlet>
        </main>
    </div>
`,
    directives: [ MDL, ROUTER_DIRECTIVES, SearchComponent ]
})
export class AppComponent { }
