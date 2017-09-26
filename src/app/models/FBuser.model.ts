import {CoverObject} from "./cover.object";

export class FBuser {
    constructor(public email?: string,
                public firstname?: string,
                public lastname?: string,
                public shortname?: string,
                public link?: string,
                public verified?: boolean,
                public puid?: string,
                public loginType?: string,
                public cover?: CoverObject) {
    }
}
