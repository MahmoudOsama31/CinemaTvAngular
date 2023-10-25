import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/models/Users';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: Users[];
  checkboxes: boolean[] = [];
  userId: string = '';
  userIdFound:boolean = false;
  constructor(private service: AdminService,private router:Router) {}

  ngOnInit(): void {
    this.users=[];
    this.service.GetAllUsers().subscribe({
      next: (list) => {
        this.users = list;
      },
      error: (err) => console.log(err),
    });
  }
  EditUserClick(id :string)
  {
    this.router.navigate(['/editUser',id]);
  }
  DeleteUser(id:string)
  {
    this.service.DeleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id!== id);
        $("#btnClose").trigger("click");
        console.log("Delete");
      },
      error: (err) => console.log(err),
    });
  }
  Showthis(id:string)
  {
     this.service.GetUser(id).subscribe({
      next:(succ)=>{
        this.userId = succ.id;
        this.userIdFound = true;
      },
      error: (err) => console.log(err),
     }); 
  }
}
