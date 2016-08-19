import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import {RepoComponent} from "./components/repo/repo.component";

const appRoutes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'repo', component: RepoComponent },
    { path: '**', component: SearchComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
