import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ActorModel } from 'src/models/ActorModel';
import { Movie } from 'src/models/Movie';
import { MovieActor } from 'src/models/MovieActor';

@Component({
  selector: 'app-edit-movie-actor',
  templateUrl: './edit-movie-actor.component.html',
  styleUrls: ['./edit-movie-actor.component.css']
})
export class EditMovieActorComponent implements OnInit {
  message: string = '';
  title!: string;
  maForm!: FormGroup;
  movies!:Movie[];
  actors!:ActorModel[];
  movieActor!:MovieActor;
  id!:number;

  messageValidate = {
    actorId: {
      requierd: 'اسم ممثل الفيلم مطلوب',
    },
    movieId: {
      required: 'اسم الفيلم مطلوب',
    },
  };
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )
  {}
  ngOnInit(): void {
    this.title = 'Add Movie Actor';
    this.GetAllActors();
    this.GetAllMovies();
    this.movies = [];
    this.actors = [];
    this.id = 0;
    this.maForm = this.fb.group({
      actorId: [0, Validators.required],
      movieId: [0, Validators.required],
    });
    this.movieActor = {
      id: 0,
      actor: null!,
      actorId: 0,
      movieId: 0,
      movie: null!
    };

    this.activatedRoute.paramMap.subscribe(params => {
      const movActid = Number(params.get('id'));
      if(movActid)
      {     
        this.service.GetMovieActorById(movActid).subscribe({
          next:(succ)=>
          {
            this.title = 'Edit Movie Actor';
            this.id = movActid;
            this.maForm.patchValue({
              actorId: succ.actorId,
              movieId: succ.movieId
            });
          },
          error:(err)=>{
            console.log(err);
          }
        });
      }
    });
  }
  GetAllActors()
  {
    this.service.GetAllActors().subscribe({
      next:(list)=>{
        this.actors = list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  GetAllMovies()
  {
    this.service.GetAllMovies().subscribe({
      next:(list)=>{
        this.movies = list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  AddOrEditMovieActor()
  {
    const movId = this.maForm.value.movieId;
    const actId = this.maForm.value.actorId;
    if (this.maForm.invalid || movId < 1 || actId < 1) {
      return;
    }
    if(this.id > 0)
    {
      this.movieActor.actorId = actId;
      this.movieActor.movieId = movId;
      this.movieActor.id = this.id;
      this.service.EditMovieActor(this.movieActor).subscribe({
        next:(succ)=>{
          this.backToList();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else
    {
      this.movieActor.actorId = actId;
      this.movieActor.movieId = movId;
      this.service.AddMovieActor(this.movieActor).subscribe({
        next:(data)=>{
          this.message = 'تم اضافة الفيلم بنجاح';
          this.maForm.reset();
          this.maForm.patchValue({
            actorId: 0,
            movieId: 0
          });
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  backToList()
  {
    sessionStorage.setItem('movieActor', 'movieActor');
    this.router.navigate(['/controlpanel']);
  }
}
