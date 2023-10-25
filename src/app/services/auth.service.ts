import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email!: string;
  expire!: string;
  role!: string;
  constructor(private cryptService : CryptService,private http:HttpClient)
  { 
    if (this.isUserRegistered()) {
      this.expire = this.cryptService.decrypt(localStorage.getItem('expire') as string);
      this.email = this.cryptService.decrypt(localStorage.getItem('email') as string);
      this.role = this.cryptService.decrypt(localStorage.getItem('role') as string);
    }
    
  }

  validateUser(email: string, role: string) {
    return this.http.get('https://localhost:7205/api/Account/CheckUserClaims/' + email + '&' + role, {withCredentials: true}).pipe();
  }
  isUserRegistered() {
    const email = !!localStorage.getItem('email');
    const exp = !!localStorage.getItem('expire');
    const role = !!localStorage.getItem('role');

    if (email && role && exp) {
      return true;
    }
    return false;
  }
  isExpireDate(day: string) {
    const dateNow = new Date();
    const dateExpire = new Date(Date.parse(day));
    if (dateExpire < dateNow) {
      localStorage.clear();
      return true;
    }
    return false;
  }
  GetRoleName(email: string) {
    return this.http
      .get('https://localhost:7205/api/Account/GetRoleName/' + email, { responseType: 'text' })
      .pipe();
  }
  IsExpiredDate(day: string) {
    const dateNow = new Date();
    const dateExpire = new Date(Date.parse(day));
    if (dateExpire < dateNow) {
      return true;
    }
    return false;
  }

  installStorage(rem:boolean,email:string)
  {
    const day = new Date();
    if(rem)
        {
           day.setDate(day.getDate()+10);
        }
        else
        {
          day.setMinutes(day.getMinutes()+1);
        }

        localStorage.setItem('email',this.cryptService.encrypt(email));
        localStorage.setItem('expire',this.cryptService.encrypt(day.toString()));

        this.GetRoleName(email).subscribe({
          next:(succ)=>{
            localStorage.setItem('role',this.cryptService.encrypt(succ));
          },
          error:(err)=>{
            console.log(err);
          }
        });

  }
}
