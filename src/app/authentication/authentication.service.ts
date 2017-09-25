import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'

import {User} from "../models/user.model";
import {FBuser} from "../models/FBuser.model";
import {CoverObject} from "../models/cover.object";
import {Router} from "@angular/router";

declare const FB: any;

@Injectable()
export class AuthenticationService {
    callsUrl: string = 'https://api-storage.herokuapp.com/api/user';

    constructor(private http: Http,
                private router: Router) {
    }

    public signUp(user, link: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(user);
        console.log(body);

        return this.http.post(link, body)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    public signIn(user, link: string) {
        const headers = new Headers({'Content-Type': 'application/json'});

        //producing the string of the call of the sign in
        const signInCallURL = link.concat('/', user.username, '/', user.password);
        return this.http.get(signInCallURL)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    FBSignIn(onResponse) {
        const callsFBUrl = 'https://api-storage.herokuapp.com/api/user';
        let fbuser = new FBuser();
        //check login status. if connected then ask for user data. The user will be matched in the database by email
        //and user fb id
        FB.getLoginStatus(function (response) {
            //----------------->SIGN IN
            if (response.status === "connected") {
                console.log(response);
                localStorage.setItem('accessToken' ,response.authResponse.accessToken);
                //get the data of the user
                console.log('LOGGING IN');
                FB.api('/me', 'get', {fields: "email,first_name,last_name,short_name,id,link,verified"},
                    function (resp) {
                        fbuser = new FBuser(resp.email,
                            resp.first_name,
                            resp.last_name,
                            resp.short_name,
                            resp.link,
                            resp.verified,
                            resp.id,
                            'facebook',
                            new CoverObject(null,null,null,null));
                        FB.api('/me/picture',function (response) {
                           fbuser.cover.source = response.data.url;
                           onResponse(fbuser);
                        });
                    });
            } else {
                //--------------->SIGN UP
                //if the user isnt connected a pop up window appears and asks for authentication
                FB.login(function (response) {
                        if (response.status === "connected") {
                            //then the same happens and we produce the user model which will be sent to the database
                            FB.api('/me', 'get', {fields: "email,first_name,last_name,short_name,id,cover,link,verified"},
                                function (resp) {
                                    //producing the FBuser model to send to the signUp function
                                    fbuser = new FBuser(resp.email,
                                        resp.first_name,
                                        resp.last_name,
                                        resp.short_name,
                                        resp.link,
                                        resp.verified,
                                        resp.id,
                                        'facebook',
                                        new CoverObject(resp.cover.id, resp.cover.offset_x, resp.cover.offset_y, resp.cover.source));
                                    console.log('Signing Up');
                                    onResponse(fbuser);

                                });
                        }
                    }, //these are the permissions we are asking the user to give us
                    {scope: 'public_profile,user_friends,email,pages_show_list,user_photos', return_scopes: true});
            }
        });

    }

    checkUserLoginStatus(path: string) {
        if (localStorage.getItem('token')) {
            if(path){
                this.router.navigateByUrl(path);
            }
        } else {
            this.router.navigateByUrl('sign-in');
        }
    }

}
