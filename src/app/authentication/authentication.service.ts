import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'

import {User} from "../models/user.model";
import {error} from "util";

declare const FB: any;

@Injectable()
export class AuthenticationService {
    callsUrl: string = 'https://api-storage.herokuapp.com/api/user';

    constructor(private http: Http) {
    }

    signUp(user: User) {
        const body = JSON.stringify(user);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.callsUrl, body)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signIn(user: User) {
        //producing the string of the call of the sign in
        const signInCallURL = this.callsUrl.concat('/',user.username, '/', user.password);
        console.log(user);
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(signInCallURL)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
        /*return this.http.post('https://csethesis.herokuapp.com/auth/signin', body ,{headers: headers})
            .map((response: Response)=> response.json())
            .catch((error: Response)=> Observable.throw(error.json()));*/
    }

    FBSignIn() {

        //check login status. if connected then ask for user email. The user will be matched in the database by email
        //and user fb id
        FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
                //get the email of the user from facebook
                FB.api('/me', 'get', {fields: "email"}, function (resp) {
                    const user = new User(resp.email, 'FB', '', '', '', response.authResponse.userID);
                    console.log(user);
                    return user;
                });
            } else {
                //if the user isnt connected a pop up window appears and asks for authentication
                FB.login(function (response) {
                        if (response.status === "connected") {
                            const userID = response.userID;
                            const newuserID = '/'.concat(userID);
                            //then the same happens and we produce the user model which will be sent to the database
                            FB.api('/me', function (resp) {
                                const user = new User(resp.email, 'FB', '', resp.first_name, resp.last_name, response.authResponse.userID);
                                console.log(resp);
                                return user;
                            });
                        }
                    }, //these are the permissions we are asking the user to give us
                    {scope: 'public_profile,user_friends,email,pages_show_list', return_scopes: true});
            }
        });
    }

}
