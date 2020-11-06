import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
   }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<Array<UserInfo>>(`${environment.API_URL}/authentication/GetAllUsers`, {headers: this.headers});
  }

  updateUser(userInfo: UserInfo): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/authentication/UpdateUserInfo`, userInfo, {headers: this.headers});
  }
  createUser(userInfo: UserInfo): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/authentication/Register`, userInfo, {headers: this.headers});
  }

  deleteUser(userInfo: UserInfo): Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/authentication/DeleteUser`, { params: { userName: userInfo.userName },
                                                                                       headers: this.headers});
  }

}
