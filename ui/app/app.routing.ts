import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {RepoComponent} from "./components/repo/repo.component";
import {Constants} from "./commons/constants";

const appRoutes: Routes = [
    { path: Constants.SEARCH, component: SearchComponent },
    { path: Constants.REPO, component: RepoComponent },
    { path: Constants.ALL, component: SearchComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
