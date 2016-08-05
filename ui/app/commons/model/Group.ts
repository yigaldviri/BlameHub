
import {CommitResult} from "./CommitResult";
export class Group {

    constructor(private groupValue: string,
                private commitResult: Array<CommitResult>){

    }

    static fromJson(json: any): Group {
        return new Group(json.groupValue, CommitResult.fromJsonList(json.result));
    }

    static fromJsonList(jsonList: any): Array<Group> {
        var res: Array<Group> = [];
        jsonList.forEach( (item: string): void => {
            res.push(this.fromJson(item));
        });
        return res;
    }
}