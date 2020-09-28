import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  public isLoginSubject = new BehaviorSubject<boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
      console.log('Constructor AuthService Current User:');
      console.log(this.currentUser);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isAuthenticated() {
    return this.isLoginSubject.value;
  }

  getCurrentUser(): User {
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined;
  }

  register(registerUserDto: any) {
    return this.http.post(`${environment.API_URL}/authentication/register`, registerUserDto);
  }

  login(username: string, password: string): Observable<User>{
    return this.http.post<any>(`${environment.API_URL}/authentication/login`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoginSubject.next(false);
  }
}
