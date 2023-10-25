import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SubCategoryModel } from 'src/models/SubCategoryModel';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movieForm!: FormGroup;
  Msg!:string;
  subCategories!:SubCategoryModel[];
  img:File|null = null;
  urlImage!: string;
  linkVal = '(https?|ftp)://(www\d?|[a-zA-Z0-9]+)?\.[a-zA-Z0-9-]+(\:|\.)([a-zA-Z0-9.]+|(\d+)?)([/?].*)?';
  id!:number;
  messages = {
    movieName: {
      requierd: 'اسم الفيلم مطلوب',
    },
    story: {
      requierd: 'القصة مطلوبة'
    },
    trailer: {
      requierd: 'اعلان الفيلم مطلوب',
      valid: 'الرابط المدخل غير صحيح'
    },
    catId: {
      requierd: 'التصنيف مطلوب'
    },
    post: {
      requierd: 'ملصق الفيلم مطلوب'
    },
  }
  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.Msg = '';
    this.subCategories = [];
    this.img = null;
    this.id = 0;
    this.urlImage = 'assets/profile.png';
    this.movieForm = this.fb.group({
      movieName: ['', Validators.required],
      story: ['', Validators.required],
      trailer: ['', [Validators.required, Validators.pattern(this.linkVal)]],
      catId: [0, Validators.required],
      post: '',
    });
    this.GetAllSubCategory();

    this.activatedRoute.paramMap.subscribe(params=>{
      var id =Number(params.get('id'));
      if(id){
        this.service.GetMovie(id).subscribe({
          next:(movie )=>{
            this.movieForm.patchValue({
              movieName: movie.movieName,
              story: movie.movieStory,
              trailer: movie.movieTrailer,
              catId: movie.subCategory.id,
            });
            this.id = movie.id;
          this.urlImage =movie.moviePost;
          fetch(this.urlImage).then(res => res.blob()).then(blob => {
            var file = new File([blob], movie.moviePost);
            this.img = file;
          })
          },
          error:(err)=>{
            console.log(err);
          }       
        });
      }
      else{
        this.backToList();
      }
    });
  }
  GetAllSubCategory()
  {
    this.service.getAllSubCategories().subscribe({
      next:(list)=>{
        this.subCategories = list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  editMovie()
  {
    if (this.movieForm.valid && this.img !== null) 
    {
      const fd = new FormData();
      fd.append('image', this.img);
      fd.append('id', this.id.toString());
      fd.append('story', this.movieForm.value.story);
      fd.append('movieName', this.movieForm.value.movieName);
      fd.append('trailer', this.movieForm.value.trailer);
      fd.append('subCatId', this.movieForm.value.catId);

      this.service.EditMovie(fd).subscribe({
        next:(succ)=>{
          this.backToList();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  backToList()
  {
    sessionStorage.setItem('editmovie', 'editmovie');
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
