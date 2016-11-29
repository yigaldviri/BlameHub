import { Component, } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MDL} from "./MDL/MDL";
import {SearchComponent} from "./components/search/search.component";
import {ApiService} from "./services/apiService";
import {Router} from "@angular/router";
import {Constants} from "./commons/constants";

@Component({
    selector: 'my-app',
    template:
        `
        <div mdl>
        <bh-navbar></bh-navbar>
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
    providers: [ApiService],
    directives: [ MDL, ROUTER_DIRECTIVES, SearchComponent ]
})
export class AppComponent {
  
  constructor(private apiService: ApiService, private router: Router) {
      apiService.getRepoUrl().subscribe(
        (repoUrl: any): void => {
            if (!repoUrl._body) {
              this.router.navigateByUrl(Constants.REPO);
            }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
