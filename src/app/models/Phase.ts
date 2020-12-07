import { Match } from './Match';

export class Phase {
    id: number;
    name: string;
    rankingId: number;
    startDate: Date;
    endDate: Date;
    Matches: Match[];
}