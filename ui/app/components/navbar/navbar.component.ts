'use strict';
import { Constants } from "../../commons/constants";
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bh-navbar',
    template:
        `
        <div>
            <i class="material-icons"
                style="position: absolute; margin: 2% 2%; color: white; font-size: 30px; cursor: pointer;"
                (click)="goTo()" href>
                {{iconName}}
            </i>
        </div>
        `
})

export class NavbarComponent {

    private static SETTINGS: string = "settings";
    private static HOME: string = "home";
    private iconName: string = NavbarComponent.SETTINGS;

    constructor(private router: Router) {
    }

    // todo: do a proper navigation.
    goTo(): void {
        var repoPath = "/" + Constants.REPO;
        if(this.router.url === repoPath){
            this.router.navigateByUrl(Constants.SEARCH);
        } else{
            this.router.navigateByUrl(Constants.REPO);
        }
        this.setIcon();
    }

    setIcon(): void {
        this.iconName =
            this.iconName === NavbarComponent.SETTINGS ?
            NavbarComponent.HOME :
            NavbarComponent.SETTINGS;
    }
}
