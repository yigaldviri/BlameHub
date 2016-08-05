import {Group} from "./Group";

export class GroupsResult {

    constructor(private matches?: string,
                private values?: Array<Group>){
        console.log("in ");
    }

    public static fromJson(json: any): GroupsResult {
        if (!json) {
            return;
        }

        return new GroupsResult(json.matches, Group.fromJsonList(json.values));
    }
}