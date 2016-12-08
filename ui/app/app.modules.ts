import { routing, appRoutingProviders } from './app.routing';
import { AppComponent }       from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import {SearchComponent} from "./components/search/search.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {ApiService} from "./services/apiService";
import {SettingsService} from "./services/settingsService";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        NavbarComponent,
        AppComponent,
        SearchComponent,
    ],
    providers: [
        appRoutingProviders,
        HTTP_PROVIDERS,
        ApiService,
        SettingsService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
