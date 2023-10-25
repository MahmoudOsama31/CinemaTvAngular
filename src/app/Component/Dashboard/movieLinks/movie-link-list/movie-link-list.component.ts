import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MovieLinks } from 'src/models/MovieLinks';

@Component({
  selector: 'app-movie-link-list',
  templateUrl: './movie-link-list.component.html',
  styleUrls: ['./movie-link-list.component.css']
})
export class MovieLinkListComponent implements OnInit{
  formSearch!:FormGroup;
  movieLinks!:MovieLinks[];
  constructor(
    private service:AdminService,
    private router:Router,
    private fb:FormBuilder
  ){}
  ngOnInit(): void {
    this.GetMovieLinks(null!);
    this.movieLinks=[];
    this.formSearch=this.fb.group({
      search:['',Validators.required]
    })
    
  }
  GetMovieLinks(search: string)
  {
    this.service.GetAllMovieLinks(search).subscribe({
      next:(list)=>{
        this.movieLinks=list;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  AddMovieLink()
  {
    this.router.navigate(['addmovielink']);
  }
  onSearch()
  {
    if(this.formSearch.valid)
    {
      var search = this.formSearch.value.search;
      this.GetMovieLinks(search);
    }
  }
  SelectAll()
  {}
  EditMovieLink(id:number)
  {
    this.router.navigate(['editmovielinks',id]);
  }
  DeleteConfirm()
  {}
}
