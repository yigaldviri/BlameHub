export class RepoInfo {

    constructor(private repoUsername?: string,
                private repoPassword?: string,
                private repoUrl?: string){
    }

    getRepoUrl(): string {
        return this.repoUrl;
    }

    setRepoUrl(url: string): void {
        this.repoUrl = url;
    }

    getRepoUsername(): string {
        return this.repoUsername;
    }

    setRepoUsername(username: string): void {
        this.repoUsername = username;
    }

    getRepoPassword(): string {
        return this.repoPassword;
    }

    setRepoPassword(pass: string): void {
        this.repoPassword = pass;
    }
}