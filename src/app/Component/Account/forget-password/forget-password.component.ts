import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptService } from 'src/app/services/crypt.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { ResetPassword } from 'src/models/resetPassword';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!:FormGroup;
  message:string='';
  passModel!:ResetPassword;
constructor(private fb:FormBuilder,private service:RegisterServiceService,private router:Router,private encService:CryptService)
{

}
  ngOnInit(): void {
    this.passModel={
      ID:'',
      Token:'',
      password:''
    }
    this.forgetForm = this.fb.group({
      email:['',Validators.required]
    });
  }
  RequestPassword() {
    var email = this.forgetForm.value.email;
    if (email !== null || email !== '') {
      this.service.ForgetPassword(email).subscribe({
        next:(x)=>{
          var i = 0;
          var exist = false;
          var token = Object.values(x).toString();
          while (localStorage.getItem('token' + i) !== null) {
            i++;
            if (localStorage.getItem('token' + i) === null) {
              localStorage.setItem('token' + i, this.encService.encrypt(token));
              exist = true;
              break;
            }
          }
          if (!exist) {
            localStorage.setItem('token' + i, this.encService.encrypt(token));
          }
          this.message = 'اذا كان الايميل المدخل صحيح فان رسالة التفعيل ارسلت اليه';
        },
        error:(err)=>console.log(err)
      })
    }
  }
}
