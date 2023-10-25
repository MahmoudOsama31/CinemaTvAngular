import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {
  title!:string;
  message!:string;
  img:File|null = null;
  id!: number;
  urlImage!:string;
  actorForm!:FormGroup;
  messageValidate = {
    actorName: {
      required: 'اسم الممثل مطلوب ',
    },
    actorImage: {
      required: 'صورة الممثل مطلوب ',
    },
  };
  constructor(
private fb: FormBuilder,
private router:Router,
private activateRoute:ActivatedRoute,
private service:AdminService
  ){}
  ngOnInit(): void {
    this.title = "Add Actor";
    this.id = 0;
    this.urlImage = 'assets/profile.png';
    this.actorForm = this.fb.group({
      actorName: ['', Validators.required],
      actorImage: [null]
    })
    this.activateRoute.paramMap.subscribe((param) => {

      var idParam = Number(param.get('id'));
      if (idParam) {
        this.service.GetActor(idParam).subscribe({
          next: (actor) => {
            this.title = 'Edit Actor';
            this.id = idParam;
            this.actorForm.patchValue({
              actorName: actor.actorName,
            });
            this.urlImage = actor.actorPicture;
            fetch(this.urlImage).then(res=>res.blob()).then(blob=>{
              var file = new File([blob],actor.actorPicture);
              this.img = file;
            })
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }
  AddActor()
  {
    if(this.actorForm.valid)
    {
      const fd = new FormData();
      fd.append('Image', this.img!);
      fd.append('actorName', this.actorForm.value.actorName);
      if(this.id > 0)
      {
        fd.append('id', this.id.toString());
        this.service.EditActor(fd).subscribe({
          next: (actor) => {
            this.GoToList();           
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else
      {
        this.service.AddActor(fd).subscribe({
          next:(succ)=>{
            this.message = 'Added';
          },
          error:(err)=>{
            this.message = 'null';
          }
        });
      }
    }
  }
  GoToList()
  {
    sessionStorage.setItem('actor', 'actor');
    this.router.navigate(['/controlpanel']);
  }
  HandleFiles(event: any)
  {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
       $('#image').attr('src', e.target?.result?.toString() || '');
      }
      reader.readAsDataURL(this.img!);
    } else {
      this.img = null;
      $('#image').attr('src','assets/profile.png');
    }
  
  }
}
