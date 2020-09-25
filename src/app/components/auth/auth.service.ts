import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserValue: any;

  constructor(private http: HttpClient) { }


  register(registerUserDto: any) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    return this.http.post(`http://localhost:5000/api/authentication/register`, registerUserDto, { headers });
  }
}
