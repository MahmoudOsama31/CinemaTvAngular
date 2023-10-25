import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { Movie } from 'src/models/Movie';
import { SubCategoryModel } from 'src/models/SubCategoryModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formSearch!:FormGroup;
  subCategories!:SubCategoryModel[];
  movies!:Movie[];
  message!:String;
  constructor(
private fb:FormBuilder,
private service:HomeService,
private activatedRoute:ActivatedRoute,
private router:Router
  ){}
  ngOnInit(): void {
    this.subCategories=[];
    this.movies=[];
    this.message=null!;
    this.GetSubCategories();
    //this.GetMovies(null!);
    this.formSearch=this.fb.group({
      search:['',Validators.required]
    });
    this.activatedRoute.paramMap.subscribe(params => {
      var actorId = Number(params.get('id'));
      if(actorId)
      {
        this.service.GetAllMoviesByActorId(actorId).subscribe({         
          next:(list)=>{
            this.movies = this.movies || [];
            for (let i = 0; i < list.length; i++)
            {
              const movie = list[i].movie;
              if (movie.id > 0) {
                this.movies.push(movie); 
              }
            }
          },
          error:(error)=>{
            console.log(error);
          }
        });
      }
      else
      {
        this.GetMovies(null!);
      }

    });
  }
  GetSubCategories()
  {
    this.service.GetAllSubCategories().subscribe({
      next:(list)=>{
        this.subCategories = list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  GetMovies(search:string)
  {
    this.service.GetAllMovies(search).subscribe({
      next:(list)=>{
        this.movies = list;
      },
      error:(err)=>{
        console.log(err);
      }      
    });
  }
  GetSubCategory(categoryName:string)
  {
    this.GetMovies(categoryName);
  }
  navigateMovie(id :number)
  {
    this.router.navigate(['/getMovie',id]);
  }
  onSearch()
  {
    if(this.formSearch.valid){
    const search = this.formSearch.value.search;
    this.service.GetAllMovies(search).subscribe({
      next:(list)=>{
        if(list.length>0)
        {
          this.movies = list;
          this.message=null!;
        }
        else
        {
          this.movies = null!;
          this.message = 'لم يسفر البحث عن اي نتيجة. حاول بكلمات أخري';
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  }
}
