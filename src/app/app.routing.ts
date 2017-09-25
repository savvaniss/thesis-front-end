import {RouterModule, Routes} from "@angular/router";

import { SignUpComponent } from "./authentication/sign-up/sign-up.component"
import { SignInComponent } from "./authentication/sign-in/sign-in.component"
import {ProfileComponent} from "./authentication/profile/profile.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    {path: 'sign-in', component: SignInComponent },
    {path: 'sign-up', component: SignUpComponent },
    {path: 'user-profile', component: ProfileComponent}

];

export const routing = RouterModule.forRoot(APP_ROUTES);
