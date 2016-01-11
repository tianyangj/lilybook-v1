import { IComposition } from './composition.model';
import { IAccount } from './account.model';

export enum ActivityType {
    Like,
    Follow,
    Comment,
    Repertoire,
    Difficulty,
    Todo
}

export interface IActivity {
    base: Parse.Object;
    id: string;
    type: ActivityType;
    fromUser: IAccount;
    composition: IComposition;
    createdAt: Date;
    updatedAt: Date;
    meta?: any;
}
