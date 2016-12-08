import { Component, } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {MDL} from "./MDL/MDL";
import {SearchComponent} from "./components/search/search.component";
import {Router} from "@angular/router";
import {Constants} from "./commons/constants";
import {SettingsService} from "./services/settingsService";
import {ApiService} from "./services/apiService";
import {NavbarComponent} from "./components/navbar/navbar.component";

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
    providers: [SettingsService],
    directives: [ MDL, ROUTER_DIRECTIVES, NavbarComponent ]
})
export class AppComponent {
  
  constructor(private settingsService: SettingsService,
              private router: Router) {
      settingsService.getRepoUrl().subscribe(
        (repoUrl: string): void => {
            if (!repoUrl) {
              this.router.navigateByUrl(Constants.REPO);
            }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
