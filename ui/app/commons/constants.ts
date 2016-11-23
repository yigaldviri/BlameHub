
export class Constants {

    public static ALL: string = "**";
    public static SEARCH: string = "search";
    public static REPO: string = "repo";
}

export enum MainIcon {
    SETTINGS,
    HOME
}

export namespace DPStrategy {
    export var whichIcon: Function = (context: string): MainIcon => {
        switch (context) {
            case "settings":
                return MainIcon.SETTINGS;
            default:
                return MainIcon.HOME;
        }
    };
}