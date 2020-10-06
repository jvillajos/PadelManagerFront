import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  getClubsByUser(username: string): Observable<any> {
    const params = new HttpParams().append('username', username);
    return this.http.get<Observable<any>>(`${environment.API_URL}/ranking/GetRankingsByUser`, { params });
  }
}
