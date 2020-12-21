import { Couple } from './Couple';
export class Match {
    id: number;
    phaseId: number;
    rankingGroupId: number;
    couple1: Couple;
    couple2: Couple;
    isPlayed: boolean;
    couple1Set1Result?: number;
    couple1Set2Result?: number;
    couple1Set3Result?: number;
    couple2Set1Result?: number;
    couple2Set2Result?: number;
    couple2Set3Result?: number;
    updateDate:Date
}