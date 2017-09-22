import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'

import {User} from "../models/user.model";
import {FBuser} from "../models/FBuser.model";
import {CoverObject} from "../models/cover.object";
import {error} from "util";

declare const FB: any;

@Injectable()
export class AuthenticationService {
    callsUrl: string = 'https://api-storage.herokuapp.com/api/user';

    constructor(private http: Http) {
    }

    public signUp(user, link: string) {
        const body = JSON.stringify(user);
        console.log(body);
/*
        const headers = new Headers({'Content-Type': 'application/json'});
*/
        return this.http.post(link, body)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    public signIn(user: User, link: string) {
        //producing the string of the call of the sign in
        const signInCallURL = link.concat('/', user.username, '/', user.password);
        /*
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        */
        return this.http.get(signInCallURL)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
        /*return this.http.post('https://csethesis.herokuapp.com/auth/signin', body ,{headers: headers})
            .map((response: Response)=> response.json())
            .catch((error: Response)=> Observable.throw(error.json()));*/
    }

    FBSignIn() {
        const callsFBUrl = 'https://api-storage.herokuapp.com/api/user';
        let fbuser = new FBuser();
        //check login status. if connected then ask for user data. The user will be matched in the database by email
        //and user fb id
        FB.getLoginStatus(function (response) {
            //----------------->SIGN IN
            if (response.status === "connected") {
                //get the data of the user
                FB.api('/me', 'get', {fields: "email,first_name,last_name,short_name,id,cover,link,verified"}, function (resp) {
                    fbuser = new FBuser(resp.email,
                        resp.first_name,
                        resp.last_name,
                        resp.short_name,
                        resp.link,
                        resp.verified,
                        resp.id,
                        'facebook',
                        new CoverObject(resp.cover.id,resp.cover.offset_x,resp.cover.offset_y,resp.cover.source));
                    console.log('LOGGING IN');
                    console.log(fbuser);
                    this.signUp(fbuser,callsFBUrl)
                        .subscribe(data=>{
                                return data;
                            },
                            error=>{
                                console.error(error);
                            });

                    /*                  const sample =() =>{
                                          return this.signUp(fbuser,callsFBUrl);
                                      }*/
/*
                    return this.signUp(user,callsFBUrl);
*/
                });
            } else {
                //--------------->SIGN UP
                //if the user isnt connected a pop up window appears and asks for authentication
                FB.login(function (response) {
                        if (response.status === "connected") {
                            //then the same happens and we produce the user model which will be sent to the database
                            FB.api('/me', 'get', {fields: "email,first_name,last_name,short_name,id,cover,link,verified"}, function (resp) {
                                //producing the FBuser model to send to the signUp function
                                fbuser = new FBuser(resp.email,
                                    resp.first_name,
                                    resp.last_name,
                                    resp.short_name,
                                    resp.link,
                                    resp.verified,
                                    resp.id,
                                    'facebook',
                                    new CoverObject(resp.cover.id,resp.cover.offset_x,resp.cover.offset_y,resp.cover.source));
                                console.log('Signing Up')
                                console.log(fbuser);
                                this.signUp(fbuser,callsFBUrl)
                                    .subscribe(data=>{
                                        return data;
                                    },
                                        error=>{
                                        console.error(error);
                                        });

                                /*const sample =() =>{
                                    return this.signUp(fbuser,callsFBUrl);
                                }*/
                            });
                        }
                    }, //these are the permissions we are asking the user to give us
                    {scope: 'public_profile,user_friends,email,pages_show_list,user_photos', return_scopes: true});
            }
        });

        return this.signUp(fbuser,callsFBUrl);
    }

}
