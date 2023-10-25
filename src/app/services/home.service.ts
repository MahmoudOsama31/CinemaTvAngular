import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/Movie';
import { MovieModel } from 'src/models/MovieModel';
import { SubCategoryModel } from 'src/models/SubCategoryModel';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  BaseUrl = 'https://localhost:7205/api/Home/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    //withCredentials : true 
  };
  constructor(private http: HttpClient) { }
  GetAllMovies(search: string):Observable<Movie[]>
  {
    return this.http.get<Movie[]>(this.BaseUrl + 'GetAllMovies/' + search,this.headers).pipe();
  }
  GetAllSubCategories():Observable<SubCategoryModel[]>
  {
    return this.http.get<SubCategoryModel[]>(this.BaseUrl + 'GetAllSubCategories',this.headers).pipe();
  }
  GetMovie(id:number):Observable<MovieModel>
  {
    return this.http.get<MovieModel>(this.BaseUrl + 'GetMovie/' + id,this.headers).pipe();
  }
  GetAllMoviesByActorId(id:number):Observable<MovieModel[]>
  {
    return this.http.get<MovieModel[]>(this.BaseUrl + 'GetAllMoviesByActorId/' + id,this.headers).pipe();
  }
}
