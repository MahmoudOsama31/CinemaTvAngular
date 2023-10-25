import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatch } from 'src/app/crossFieldValidation/passwordConfirmValidation';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { Register } from 'src/models/Register';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  reg: Register = {
    userName: '',
    email: '',
    password: '',
    confirmPassword:''
  };
  users:Users[];
  constructor(
    private fb: FormBuilder,
    private regService: RegisterServiceService
  ) {
    this.users=[];
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required]
    },{validators:passwordMatch});
    this.allUsers();
  }
  validateRegisterModel() {
    this.reg.userName = this.userForm.value.userName;
    this.reg.email = this.userForm.value.email;
    this.reg.password = this.userForm.value.password;
    this.reg.confirmPassword = this.userForm.value.confirmPassword;
  }
  Register() {
    if (this.userForm.valid) {
      this.validateRegisterModel();
      this.regService.PostRegister(this.reg).subscribe({
        next: (employee) => {
          alert('register success');
        },
        error: (err) => {
          alert(err.error);
          this.userForm.reset(); // after submit th data will removed
          this.ngOnInit();
        }
      });
    }
  }
  allUsers()
  {
    this.regService.GetAllUsers().subscribe({
      next:(list)=>{
        this.users = list;
      },
      error: (err) => {
        alert(err.error);
        console.log(err.error);
      }
    });
  }

isUserNameExist() 
{
  for(const n of this.users)
  {
    const username = this.userForm.value.username;
    if(n.userName==username)
    {
      return true;
    }
  }
  return false;
}
isEmailExist()
{
  for(const e of this.users)
  {
    const em = this.userForm.value.email;
    if(e.email==em)
    {
      return true;
    }
  }
  return false;
}
}

// get userName()
// {
//   return this.userForm.get('userName')?.value
// }
