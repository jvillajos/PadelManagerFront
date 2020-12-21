import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phase } from '../models/Phase';
import { Match } from '../models/Match';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {
  
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
   }

  getPhasesByRankingId(rankingId: number): Observable<Phase[]> {
    const params = new HttpParams().append('rankingId', rankingId.toString());
    return this.http.get<Array<Phase>>(`${environment.API_URL}/phase/GetPhasesByRankingId`, { params, headers: this.headers });
  }

  addPhaseToRanking(phase: Phase): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/phase/CreatePhase`, phase, { headers: this.headers});
  }

  updatePhaseToRanking(phase: Phase): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/phase/UpdatePhase`, phase, { headers: this.headers});
  }

  getMatchesByPhase(phaseId: number) {
    const params = new HttpParams().append('phaseId', phaseId.toString());
    return this.http.get<Array<Match>>(`${environment.API_URL}/phase/GetMatchesByPhase`, { params, headers: this.headers });
  }

  updateMatch(match: Match): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/phase/UpdateMatch`, match, { headers: this.headers});
  }
}
