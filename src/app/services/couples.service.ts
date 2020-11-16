import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Couple } from '../models/Couple';

@Injectable({
  providedIn: 'root'
})
export class CouplesService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
  }

  getCouplesByRanking(rankingId: number): Observable<Couple[]> {
    return this.http.get<Array<Couple>>(`${environment.API_URL}/couples/GetCouples`, { params : { rankingId: rankingId.toString() },
                                                                                       headers: this.headers});
  }

  addCoupleToRanking(couple: Couple) {
    return this.http.post<any>(`${environment.API_URL}/couples/CreateCouple`, couple, { headers: this.headers});
  }

  updateCoupleToRanking(couple: Couple) {
    return this.http.post<any>(`${environment.API_URL}/couples/UpdateCouple`, couple, { headers: this.headers});
  }



}
