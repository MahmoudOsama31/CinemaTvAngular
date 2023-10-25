import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptService } from 'src/app/services/crypt.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { ResetPassword } from 'src/models/resetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  passModel!: ResetPassword;
  regex!: RegExp;
  messageValidate = {
    pass: {
      required: 'كلمة المرور مطلوبة',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      notMatch: 'كلمة المرور يجب ان تحتوي علي رقم - حرف كبير - حرف صغير - حرف ممبز',
    },
    passConfirm: {
      required: 'تأكيد كلمة المرور مطلوب',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      isMatch: 'كلمتا المرور غير متطابقتين'
    }
  };
  constructor(
    private fb: FormBuilder,
    private service: RegisterServiceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private encService: CryptService
  ) {}
  ngOnInit(): void {
    this.passModel = {
      ID: '',
      Token: '',
      password: '',
    };

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.activeRoute.queryParams.subscribe({
      next:(param)=>{
        var exist = false;
        this.passModel.ID = param['ID'];
        this.passModel.Token = param['Token'];
        console.log(this.passModel.ID);
        console.log(this.passModel.Token);
        if (this.passModel.ID !==null && this.passModel.Token!==null) {
          var keys = Object.keys(localStorage);
          keys.forEach(element => {
            if (element !== null && element.includes('token')) {
              var item = localStorage.getItem(element);
              if (item !== null) {
                var token = this.encService.decrypt(item);           
                if (token === this.passModel.Token) {
                  exist = true;
                  return;
                }
              }
            }
          });
          if (!exist) {
            this.router.navigate(['home']).then(x => { window.location.reload(); })
          }
        } else {
          this.router.navigate(['home']).then(x => { window.location.reload(); })
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
 Reset() {
    if (
      this.resetForm.value.password !== null){
      this.passModel.password = this.resetForm.value.password;
      this.service.ApiResetPassword(this.passModel).subscribe({
        next: (succ) => {
          console.log('success');
          this.router.navigateByUrl('Register');
        },
        error: (err) => console.log(err),
      });
    }
  }
  isPasswordValid() {
    const pass = this.resetForm.value.password;
    if (pass !== '' && pass.length > 5) {
      this.regex = new RegExp('[a-z]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف صغير علي الأقل';
        return false;
      }
      this.regex = new RegExp('[A-Z]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف كبير علي الأقل';
        return false;
      }
      this.regex = new RegExp('[~!@#$%^&*()+<>{}]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف مميز علي الأقل';
        return false;
      }
      this.regex = new RegExp('[0-9]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي رقم واحد علي الأقل';
        return false;
      }
    }
    return true;
  }

  isPasswordMatch() {
    if (this.resetForm.value.password !== '' && this.resetForm.value.passwordConfirm !== '') {
      if ((this.resetForm.value.password !== this.resetForm.value.passwordConfirm) &&
        this.resetForm.value.password.length > 5 && this.resetForm.value.passwordConfirm.length > 5) {
        return true;
      }
    }
    return false;
  }
}
