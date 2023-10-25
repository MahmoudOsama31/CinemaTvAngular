import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
})
export class NavItemComponent implements OnInit {
  constructor(
    private service: RegisterServiceService,
    private router: Router,
    private authService: AuthService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    if (this.isUserRegistered()) {
      if (this.auth.IsExpiredDate(this.auth.expire) === true) {
        this.logOut();
      }
      this.auth.validateUser(this.auth.email, this.auth.role).subscribe({
        next: (success) => {
          console.log('user is authorized');
        },
        error: (err) => {
          console.log(err);
          this.logOut();
        },
      });
    }
  }
  logOut() {
    this.service.GetLogOut().subscribe({
      next: (list) => {
        localStorage.clear();
        console.log('authorization return false');
        this.router.navigateByUrl('home').then(x=>window.location.reload());
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
  isUserRegistered() {
    const email = !!localStorage.getItem('email');
    const exp = !!localStorage.getItem('expire');
    const role = !!localStorage.getItem('role');
    if (email && exp && role) {
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {

      if(this.auth.role == undefined && this.auth.role == null)
      {
        return false;
      }
      if (this.auth.role.toLowerCase() == 'admin') {
        return true;
      } else {
        return false;
      }
  }
}
