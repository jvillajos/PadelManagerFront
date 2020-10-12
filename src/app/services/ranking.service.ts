import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from '../models/Ranking';

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

  getRankingsByUser(username: string): Observable<any> {
    const params = new HttpParams().append('username', username);
    return this.http.get<Array<Ranking>>(`${environment.API_URL}/ranking/GetRankingsByUser`, { params });
  }

  createRanking(ranking: Ranking): void {
    this.http.post<any>(`${environment.API_URL}/ranking/CreateRanking`, ranking, { headers: this.headers})
             .subscribe(response => console.log(response));
  }

}
