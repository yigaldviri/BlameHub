import { routing, appRoutingProviders } from './app.routing';
import { AppComponent }       from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {SearchComponent} from "./components/search/search.component";
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        SearchComponent,
    ],
    providers: [
        appRoutingProviders,
        HTTP_PROVIDERS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}