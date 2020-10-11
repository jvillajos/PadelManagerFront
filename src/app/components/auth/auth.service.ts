import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(this.getCurrentUser());
  public isLoginSubject = new BehaviorSubject<boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router) {
  }

  public get currentUserValue(): any {
    return this.getCurrentUser();
  }

  get isAuthenticated() {
    return this.isLoginSubject.value;
  }

  getCurrentUser(): any {
    return this.cookieService.get('currentUser') ? JSON.parse(this.cookieService.get('currentUser')) : undefined;
  }

  register(registerUserDto: any) {
    return this.http.post(`${environment.API_URL}/authentication/register`, registerUserDto);
  }

  login(username: string, password: string): Observable<User>{
    return this.http.post<any>(`${environment.API_URL}/authentication/login`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.cookieService.set('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
  }

  logout() {
    // remove user from cookie service and set current user to null
    this.cookieService.delete('currentUser');
    this.currentUserSubject.next(null);
    this.isLoginSubject.next(false);
    this.router.navigate(['/auth/login']);
  }
}
