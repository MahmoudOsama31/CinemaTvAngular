import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { passwordMatch } from 'src/app/crossFieldValidation/passwordConfirmValidation';
import { AdminService } from 'src/app/services/admin.service';
import { EditUserModel } from 'src/models/EditUserModel';
import { UserModel } from 'src/models/UserModel';
import { Users } from 'src/models/Users';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  title: string = 'Register';
  userForm!: FormGroup;
  userModel!: UserModel;
  users!: Users[];
  userData!: Users;
  message!: string;
  errorMsg!: string;
  editUser!: EditUserModel;
  id!: string;
  isEditMode!: boolean;
  messageValidate = {
    userName: {
      required: 'اسم المستخدم مطلوب',
      matchUserName: 'اسم المستخدم مستعمل',
    },
    email: {
      required: 'البريد الالكتروني مطلوب',
      notValid: 'البريد الالكتورني المدخل غير صحيح',
      matchEmail: 'البريد الالكتروني مستعمل',
    },
    pass: {
      required: 'كلمة المرور مطلوبة',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      notMatch:
        'كلمة المرور يجب ان تحتوي علي رقم - حرف كبير - حرف صغير - حرف ممبز',
    },
    passConfirm: {
      required: 'تأكيد كلمة المرور مطلوب',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      isMatch: 'كلمتا المرور غير متطابقتين',
    },
  };
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isEditMode = false;
    this.id = '';
    this.userModel = {
      userName: '',
      email: '',
      Password: '',
      emailConfirmed: false,
      phoneNumber: '',
    };
    this.message = '';
    this.errorMsg = '';
    this.users = [];
    this.userForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
        emailConfirmed: false,
        phoneNumber: '',
      },
      { validators: passwordMatch }
    );
    this.editUser = {
      id: '',
      userName: '',
      email: '',
      emailConfirmed: false,
      password: '',
      phoneNumber: ''
    };
    this.GetAllUsers();
    this.activateRoute.paramMap.subscribe((param) => {
      var id = param.get('id');
      if (id) {
        this.service.GetUser(id).subscribe({
          next: (succ) => {
            this.userData = succ;
            this.title = 'Edit';
            this.isEditMode = true;
            this.AddUserData();
            this.id = id as string;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  AddUserData() {
    this.userForm.controls['userName'].setValue(this.userData.userName);
    this.userForm.controls['email'].setValue(this.userData.email);
    this.userForm.controls['emailConfirmed'].setValue(
      this.userData.EmailConfirmed
    );
    this.userForm.controls['phoneNumber'].setValue(this.userData.phoneNumber);
    this.userForm.controls['password'].setValue(this.userData.passwordHash);
    this.userForm.controls['passwordConfirm'].setValue(
      this.userData.passwordHash
    );
  }
  AddUser() {
    if (this.userForm.valid) {
      if (!this.isEditMode) {
        this.validateAddUserModel();
        this.service.AddUsers(this.userModel).subscribe({
          next: (succ) => {
            this.ngOnInit();
            console.log('user added');
          },
          error: (err) => {
            console.log(err);
            console.log(this.userModel);
          },
        });
      } else {
        this.editUser.id = this.id;
        this.editUser.email = this.userForm.value.email;
        this.editUser.emailConfirmed = this.userForm.value.emailConfirmed;
        this.editUser.userName = this.userForm.value.userName;
        this.editUser.phoneNumber = this.userForm.value.phoneNumber;
        this.editUser.password = this.userForm.value.password;

        this.service.EditUser(this.editUser).subscribe({
          next: (succ) => {
            this.ngOnInit();
            console.log('user updated');
          },
          error: (err) => {
            console.log(err);
            console.log(this.editUser);
          },
        });
      }
    }
  }
  validateAddUserModel() {
    this.userModel.userName = this.userForm.value.userName;
    this.userModel.email = this.userForm.value.email;
    this.userModel.Password = this.userForm.value.password;
    this.userModel.emailConfirmed = this.userForm.value.EmailConfirmed;
    this.userModel.phoneNumber = this.userForm.value.phoneNumber;
  }
  isUserNameExist() {
    var name = this.userForm.value.userName;
    if (name !== null && name !== '') {
      for (const user of this.users.values()) {
        if (user.userName == name) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  isEmailExist() {
    var mail = this.userForm.value.email;
    if (mail !== null && mail !== '') {
      for (const user of this.users.values()) {
        if (user.email == mail) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  GetAllUsers() {
    this.service.GetAllUsers().subscribe({
      next: (list) => {
        this.users = list;
      },
      error: (err) => console.log(err),
    });
  }
}
