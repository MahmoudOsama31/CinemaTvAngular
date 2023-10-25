import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/models/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  baseUrl = 'https://localhost:7205/api/Account/';
  Headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials : true
  };
  constructor(private http: HttpClient) {}

  PostLogin(log: Login): Observable<Login> 
  {
    return this.http.post<Login>(this.baseUrl + 'Login', log, this.Headers).pipe();
  }
}
