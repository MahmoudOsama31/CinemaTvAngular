import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies!:Movie[];
  movieId!:number;
  formSearch!:FormGroup;
  constructor(
    private service: AdminService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.movies = [];
    this.movieId = 0;
    this.GetAllMovies();
    this.formSearch = this.fb.group({
      search: ['', Validators.required]
    });
  }

GetAllMovies()
{
  this.service.GetAllMovies().subscribe({
    next:(list)=>{
      this.movies = list;
      console.log(this.movies);
    },
    error:(err)=>{
      console.log(err);
    }
  });
}

  AddMovie()
  {
    this.router.navigate(['addmovie']);
  }
  EditMovie(id : number)
  {
    this.router.navigate(['editmovie',id]);
  }
  Showthis(id:number)
  {
    this.service.GetMovie(id).subscribe({
      next: (data) => {
      this.movieId = data.id;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  DeleteMovie(id:number)
  {
    this.service.DeleteMovie(id).subscribe({
      next: (succ) => {
        console.log("Delete");
    this.router.navigate(['controlpanel']).then(() => {window.location.reload();});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onSearch()
  {
    if(this.formSearch.valid)
    {
      var search = this.formSearch.value.search;
      this.service.SearchMovie(search).subscribe({
        next:(list)=>{
          this.movies = list;
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
}
