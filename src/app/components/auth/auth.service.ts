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
  private currentUserSubject: BehaviorSubject<User>;
  public isLoginSubject = new BehaviorSubject<boolean>(false);
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.isLoginSubject.next(this.currentUserSubject.value != null);
      console.log('Current User:');
      console.log(this.currentUser);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  get isAuthenticated() {
    return this.isLoginSubject.value;
  }

  register(registerUserDto: any) {
    return this.http.post(`${environment.API_URL}/authentication/register`, registerUserDto);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.API_URL}/authentication/login`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isLoginSubject.next(true);
            console.log('________________Log in___________________');
            console.log(this.isLoginSubject);
            return user;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoginSubject.next(false);
    console.log('_______________Logout_____________');
    console.log(this.isLoginSubject);
  }
}
