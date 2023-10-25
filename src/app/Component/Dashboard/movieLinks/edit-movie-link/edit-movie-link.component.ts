import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Movie } from 'src/models/Movie';
import { MovieLinks } from 'src/models/MovieLinks';

@Component({
  selector: 'app-edit-movie-link',
  templateUrl: './edit-movie-link.component.html',
  styleUrls: ['./edit-movie-link.component.css']
})
export class EditMovieLinkComponent implements OnInit {
  message:string = '';
  title!:string;
  linkForm!: FormGroup;
  movies!:Movie[];
  movieLinks!:MovieLinks;
  id!:number;
  film: File | null = null;
  url:any;
  format:any;
  messageValidate = {
    movLink: {
      required: 'الرابط مطلوب',
      valid: 'الرابط المدخل غير صحيح',
    },
    movieId: {
      required: 'اسم الفيلم مطلوب',
    },
    film: {
      requierd: 'الفيلم مطلوب',
    },
  };
  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.title = 'Add MovieLink';
    this.movies = [];
    this.id = 0;
    this.linkForm = this.fb.group({
      film: null,
      quality: '',
      resolation: 0,
      movLink: ['', Validators.required],
      movieId: [0, Validators.required],
    });
    this.movieLinks={
      id: 0,
      quality: '',
      resolation: 0,
      movLink: '',
      movieId: 0,
      movie: null!
    }
    this.GetAllMovies();

    this.activatedRoute.paramMap.subscribe(params => {
      var linkId = Number(params.get('id'));
      if (linkId)
      {
        this.service.GetMovieLinkById(linkId).subscribe({
          next:(mov)=>{
            this.id = linkId;
            this.title = 'Edit MovieLink';
            this.linkForm.patchValue({
              quality: mov.quality,
              resolation: mov.resolation,
              movLink: mov.movLink,
              movieId: mov.movieId,
            });
            if (!mov.movLink.startsWith('http')) {
              const urlImage =mov.movLink;
              fetch(urlImage).then(res => res.blob()).then(blob => {
                var file = new File([blob], mov.movLink);
                this.film = file;
                this.HandleFilmes(this.film );/////////////////////////////////////////////////////////////
              })
            }
          },
          error:(err)=>{
            console.log(err);
          }
        });
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
  AddMovieLink()
  {
    if(this.linkForm.valid)
    {
      if(this.id > 0)
      {
        const link = this.linkForm.value.movLink;
        if (this.film == null && (link == null || link == '')) {
          return;}
          const fd = new FormData();
          fd.append('video', this.film!);
          fd.append('quality', this.linkForm.value.quality);
          fd.append('resolation', this.linkForm.value.resolation);
          fd.append('movLink', this.linkForm.value.movLink);
          fd.append('movieId', this.linkForm.value.movieId);
          fd.append('id', this.id.toString());
          this.service.EditMovieLink(fd).subscribe({
            next:(res)=>{
              this.backToList();
            },
            error:(err)=>{
              console.log(err);
            }
          });
      }
      else
      {
        this.movieLinks.movLink = this.linkForm.value.movLink;
        this.movieLinks.movieId = this.linkForm.value.movieId;
        this.movieLinks.quality = this.linkForm.value.quality;
        this.movieLinks.resolation = this.linkForm.value.resolation;   
    
        this.service.AddMovieLink(this.movieLinks).subscribe({
          next:(res)=>{
            console.log('Added');
            this.linkForm.reset();
          },
          error:(err)=>{
            console.log(err);
          }
        });
      }
    }
  }
  backToList()
  {
    sessionStorage.setItem('movielink', 'movielink');
    this.router.navigate(['/controlpanel']);
  }
  HandleFilmes(event:any)
  {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.film = event.target.files[0];
      if (this.film) {
        var reader = new FileReader();
        reader.readAsDataURL(this.film);
        if(this.film.type.indexOf('video')> -1){
          this.format = 'video';
        }
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
      }
    }
    }
    else
    {
      this.film = null;
      this.format = null;
      this.url = null;
    }
  }
}
