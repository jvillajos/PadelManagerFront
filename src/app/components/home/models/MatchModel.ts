import { Match } from '../../../models/Match';
export class MatchModel {
    match:Match;
    isEditing: boolean;
    isEnabled: boolean;

    
    constructor(match:Match, isEnabled = true) {
        this.match = match;
        this.isEditing = false;
        this.isEnabled = isEnabled;
    }
}