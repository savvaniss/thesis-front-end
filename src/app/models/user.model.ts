export class User {
    constructor( public username: string,
                 public password?: string,

                 public email?: string,
                 public loginType?: string,
                 public firstname?: string,
                 public lastname?: string,
                 public userID?: string
                ) {}
    }
