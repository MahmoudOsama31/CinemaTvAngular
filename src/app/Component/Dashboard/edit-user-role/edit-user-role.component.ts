import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { EditUserRoleModel } from 'src/models/EditUserRole';
import { RoleModel } from 'src/models/RoleModel';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.css'],
})
export class EditUserRoleComponent implements OnInit {
  editUserRoleModel!: EditUserRoleModel;
  userForm!: FormGroup;
  userId!: string;
  roleId!: string;
  userName!: string;
  roles!: RoleModel[];
  messageValidate = {
    userName: {
      required: 'اسم المستخدم مطلوب',
    },
    roleName: {
      required: 'نوع الصلاحية مطلوب',
    },
  };
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.roles = [];
    this.editUserRoleModel = {
      userId: '',
      roleId: ''
    };
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      roleName: ['', [Validators.required]],
    });
    this.activateRoute.paramMap.subscribe((params) => {
      var userId = params.get('id') as string;
      var roleId = params.get('id1') as string;
      if (userId && roleId) {
        this.service.GetUser(userId).subscribe({
          next: (x) => {
            this.userId = x.id;
            this.userName = x.userName;
            this.roleId = roleId;
            this.AddUserData();
          },
          error: (e) => {
            console.log(e);
          },
        });
        this.service.GetAllRoles().subscribe({
          next: (s) => {
            this.roles = s;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.router.navigate(['notFound']).then((x) => {
          window.location.reload();
        });
      }
    });
  }
  EditRoles() {
    if (this.userId && this.roleId && this.userForm.valid) {
      this.editUserRoleModel.roleId = this.roleId;
      this.editUserRoleModel.userId = this.userId;
      this.service.EditUserRole(this.editUserRoleModel).subscribe({
        next: (succ) => {
          sessionStorage.setItem('editUserRole', 'true');
          this.router.navigate(['controlpanel']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  AddUserData() {
    this.userForm.setValue({
      userName: this.userName,
      roleName: this.roleId,
    });
  }
  onRolesChange() {
    this.roleId = this.userForm.value.roleName;
    console.log(this.roleId);
  }
}
