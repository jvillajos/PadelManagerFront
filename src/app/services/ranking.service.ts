import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from '../models/Ranking';
import { RankingGroup } from '../models/RankingGroup';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
   }

  getRankingsByUser(username: string): Observable<Ranking[]> {
    const params = new HttpParams().append('username', username);
    return this.http.get<Array<Ranking>>(`${environment.API_URL}/ranking/GetRankingsByUser`, { params, headers: this.headers });
  }

  getRankingById(rankingId: number): Observable<Ranking> {
    const params = new HttpParams().append('rankingId', rankingId.toString());
    return this.http.get<Ranking>(`${environment.API_URL}/ranking/GetRankingById`, { params, headers: this.headers });
  }

  createRanking(ranking: Ranking): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/ranking/CreateRanking`, ranking, { headers: this.headers});
  }

  updateRanking(ranking: Ranking): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/ranking/UpdateRanking`, ranking, { headers: this.headers});
  }

  getRankingGroupsByUser(username: string): Observable<RankingGroup[]> {
    const params = new HttpParams().append('username', username);
    return this.http.get<Array<RankingGroup>>(`${environment.API_URL}/ranking/GetRankingGroupsByUser`, { params, headers: this.headers });
  }

}
