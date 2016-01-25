export interface IAccount {
    base: Parse.User;
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    vanity?: string;
    profile?: {
        location: string;
        bio: string;
    }
}