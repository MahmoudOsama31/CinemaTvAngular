import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { userRoleModel } from 'src/models/userRoleModel';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  userRoles!:userRoleModel[];
  constructor(private service:AdminService,private router:Router)
  {

  }
  ngOnInit(): void {
    this.userRoles=[];
this.GetUserRole();
  } 
  GetUserRole()
  {
    this.service.GetUserRole().subscribe({
      next:(succ)=>{
        this.userRoles=succ;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  EditUserRole(userId:string,roleId:string)
  {
    this.router.navigate(['editUserRole', userId, roleId]);
  }
}
