import { Component, OnInit } from '@angular/core';
import { ActorModel } from 'src/models/ActorModel';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {
  actors!:ActorModel[];
  actorId!:number;
  actor!:ActorModel;
  constructor(private service:AdminService,private router:Router){}

  ngOnInit(): void {
    this.actorId = 0;
    this.actor={
      id:0,
      actorName:"",
      actorPicture:""
    };
    this.GetAllActors();
  }

  GetAllActors()
  {
    this.service.GetAllActors().subscribe({
      next:(List)=>{
        this.actors=List;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  AddActor()
  {
    this.router.navigate(['addactor']);
  }
  EditActor(id:number)
  {
    this.router.navigate(['editactor',id]);
  }
  DeleteActor(id:number)
  {
    this.service.DeleteActor(id).subscribe({
      next:(res)=>{
        console.log("Delete");
        this.router.navigate(['controlpanel']).then(() => {window.location.reload();});
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  Showthis(id:number)
  {
    this.service.GetActor(id).subscribe({
      next: (data) => {
      this.actorId = data.id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
