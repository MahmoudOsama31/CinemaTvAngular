import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MovieActor } from 'src/models/MovieActor';

@Component({
  selector: 'app-movie-actor-list',
  templateUrl: './movie-actor-list.component.html',
  styleUrls: ['./movie-actor-list.component.css']
})
export class MovieActorListComponent implements OnInit {
  formSearch!:FormGroup;
  movieActors!:MovieActor[];
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.movieActors = [];
    this.GetMovieActors(null!);
    this.formSearch = this.fb.group({
      search: ['']
    });
  }
  GetMovieActors(search: string)
  {
    this.service.GetAllMovieActors(search).subscribe(
      {
        next:(list)=>{
          this.movieActors = list;
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );
  }
  AddMovieActor()
  {
    this.router.navigate(['addmovieactor']);
  }
  onSearch()
  {
    var search = this.formSearch.value.search;
    this.GetMovieActors(search);
  }
  EditMovieActor(id:number)
  {
    this.router.navigate(['editmovieactors',id]);
  }
  DeleteConfirm()
  {}
}
