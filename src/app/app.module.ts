import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { AuthenticationComponent} from "./authentication/authentication.component";
import {SignInComponent} from "./authentication/sign-in/sign-in.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {AuthenticationService} from "./authentication/authentication.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        SignInComponent,
        SignUpComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule,
    ],
    bootstrap: [AppComponent],
    providers: [AuthenticationService]
})
export class AppModule {

}