import { UserInfo } from './UserInfo';
export class Couple {
    id: number;
    name: string;
    displayName: string;
    position: number;
    rankingId: number;
    rankingGroupId: number;
    rankingGroupName: string;
    users: Array<UserInfo>;
    playerNames: Array<string>;
}