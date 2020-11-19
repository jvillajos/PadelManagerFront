import { Couple } from './Couple';
import { RankingGroup } from './RankingGroup';
export class Ranking {
    id: number;
    userName: string;
    name: string;
    description: string;
    location: string;
    cp: number;
    startDate: Date;
    endDate: Date;
    groups: RankingGroup[];
    couples: Couple[];
}
