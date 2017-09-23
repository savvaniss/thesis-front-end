import {Component} from '@angular/core';

declare const FB: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor() {
        //fb.init should start right away. The appId and the version aren't optional
        FB.init({
                appId: '752997224907283',
                cookie: true,
                xfbml: true,
                version: 'v2.10'
            }
        );
        console.log("Facebook initiated");
    }

}
