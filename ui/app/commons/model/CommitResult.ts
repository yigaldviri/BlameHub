
export class CommitResult {

    constructor(private id: string,
                private name: string,
                private date: Date,
                private message: string,
                private score: number){

    }

    static fromJson(json: any): CommitResult {
        return new CommitResult(
            json.id,
            json.name_txt_en,
            new Date(json.date_dt),
            json.message[0],
            json.score);
    }

    static fromJsonList(jsonList: any): Array<CommitResult> {
        var res: Array<CommitResult> = [];
        jsonList.forEach( (item: string): void => {
            res.push(this.fromJson(item));
        });
        return res;
    }
}