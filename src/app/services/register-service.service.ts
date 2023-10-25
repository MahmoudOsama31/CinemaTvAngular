import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/models/Register';
import { Users } from 'src/models/Users';
import { ResetPassword } from 'src/models/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  baseUrl = 'https://localhost:7205/api/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials : true
  };
  constructor(private http: HttpClient) {}
  PostRegister(reg: Register): Observable<Register> {
    return this.http
      .post<Register>(this.baseUrl + 'Register', reg, this.headers)
      .pipe();
  }
  GetAllUsers(): Observable<Users[]> {
    return this.http
      .get<Users[]>(this.baseUrl + 'GetAllUsers', this.headers)
      .pipe();
  }

  GetLogOut() {
    return this.http.get(this.baseUrl + 'Logout',{withCredentials : true}).pipe();
  }
  ForgetPassword(email:string) {
    return this.http.get(this.baseUrl + 'ForgetPassword/' + email).pipe();
  }
  EmailConfirm(id: string, token: string) {
    return this.http.get(this.baseUrl + 'RegistrationConfirm?ID=' + id + '&Token=' + token).pipe();
  }

  ApiResetPassword(reset:ResetPassword):Observable<ResetPassword>
  {
    return this.http.post<ResetPassword>(this.baseUrl + 'ResetPassword',reset,this.headers).pipe();
  }

  // validateUser(email: string, role: string) {
  //   return this.http
  //     .get(this.baseUrl + 'CheckUserClaims/' + email + '&' + role, {
  //       withCredentials: true,
  //     })
  //     .pipe();
  // }

  // isExpireDate(day: string) {
  //   const dateNow = new Date();
  //   const dateExpire = new Date(Date.parse(day));
  //   if (dateExpire < dateNow) {
  //     localStorage.clear();
  //     return true;
  //   }
  //   return false;
  // }
}
