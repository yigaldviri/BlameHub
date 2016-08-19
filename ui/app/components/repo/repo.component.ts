'use strict';
import { Component }     from '@angular/core';
import { NgForm }    from '@angular/forms';
import { MDL } from "../../MDL/MDL";
import { ApiService } from "../../services/apiService";

@Component({
    selector: 'blamehub-repo',
    templateUrl: 'app/components/repo/repo.component.html',
    providers: [ApiService],
    directives: [ MDL ]
})

export class RepoComponent {

    constructor(private apiService: ApiService) {
    }


}
