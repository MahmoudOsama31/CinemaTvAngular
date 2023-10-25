import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActorModel } from 'src/models/ActorModel';
import { CategoryModel } from 'src/models/CategoryModel';
import { EditUserModel } from 'src/models/EditUserModel';
import { EditUserRoleModel } from 'src/models/EditUserRole';
import { Movie } from 'src/models/Movie';
import { MovieActor } from 'src/models/MovieActor';
import { MovieLinks } from 'src/models/MovieLinks';
import { RoleModel } from 'src/models/RoleModel';
import { SubCategoryModel } from 'src/models/SubCategoryModel';
import { UserModel } from 'src/models/UserModel';
import { Users } from 'src/models/Users';
import { userRoleModel } from 'src/models/userRoleModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BaseUrl = 'https://localhost:7205/api/Admin/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials : true 
  };
  constructor(private http: HttpClient) {}
  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.BaseUrl + 'GetAllUsers',this.headers).pipe();
  }
  AddUsers(model:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.BaseUrl + 'AddUsers',model,this.headers).pipe();
  }
  GetUser(id:string):Observable<Users>
  {
    return this.http.get<Users>(this.BaseUrl + 'GetUser/' + id,this.headers).pipe();
  }
  EditUser(editUser:EditUserModel):Observable<Users>
  {
    return this.http.put<Users>(this.BaseUrl + 'EditUser/' + editUser.id,editUser,this.headers).pipe();
  }
  DeleteUser(id:string):Observable<Users>
  {
    return this.http.delete<Users>(this.BaseUrl + 'DeleteUser/' + id,this.headers).pipe();
  }
  GetUserRole():Observable<userRoleModel[]>
  {
    return this.http.get<userRoleModel[]>(this.BaseUrl + 'GetUserRole',this.headers).pipe();
  }
  EditUserRole(editUserRole:EditUserRoleModel):Observable<Users>
  {
    return this.http.put<Users>(this.BaseUrl + 'EditUserRole',editUserRole,this.headers).pipe();
  }
  GetAllRoles():Observable<RoleModel[]>
  {
    return this.http.get<RoleModel[]>(this.BaseUrl + 'GetAllRoles',this.headers).pipe();
  }
  GetAllCategories():Observable<CategoryModel[]>
  {
    return this.http.get<CategoryModel[]>(this.BaseUrl + 'GetCategories',this.headers).pipe();
  }
  AddCategory(model:CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.BaseUrl + 'AddCategory',model,this.headers).pipe();
  }
  EditCategory(editCat:CategoryModel):Observable<CategoryModel>
  {
    return this.http.put<CategoryModel>(this.BaseUrl + 'EditCategory',editCat,this.headers).pipe();
  }
  DeleteCategory(id:number):Observable<CategoryModel>
  {
    return this.http.delete<CategoryModel>(this.BaseUrl + 'DeleteCategory/' + id,this.headers).pipe();
  }
  GetCategoryById(id:number):Observable<CategoryModel>
  {
    return this.http.get<CategoryModel>(this.BaseUrl + 'GetCategoryById/' + id,this.headers).pipe();
  }
  getAllSubCategories():Observable<SubCategoryModel[]>
  {
    return this.http.get<SubCategoryModel[]>(this.BaseUrl + 'getAllSubCategories', this.headers).pipe();
  }
  AddSubCategory(model:SubCategoryModel):Observable<SubCategoryModel>
  {
    return this.http.post<SubCategoryModel>(this.BaseUrl + 'AddSubCategory',model, this.headers).pipe();
  }
  EditSubCategory(editSubCat:SubCategoryModel):Observable<SubCategoryModel>
  {
    return this.http.put<SubCategoryModel>(this.BaseUrl + 'EditSubCategory',editSubCat,this.headers).pipe();
  }
  DeleteSubCategory(id:number):Observable<SubCategoryModel>
  {
    return this.http.delete<SubCategoryModel>(this.BaseUrl + 'DeleteSubCategory/' + id,this.headers).pipe();
  }
  GetSubCategoryById(id:number):Observable<SubCategoryModel>
  {
    return this.http.get<SubCategoryModel>(this.BaseUrl + 'GetSubCategoryById/' + id,this.headers).pipe();
  }
  GetAllActors():Observable<ActorModel[]>
  {
    return this.http.get<ActorModel[]>(this.BaseUrl + 'GetAllActors', this.headers).pipe();
  }
  AddActor(FormData:FormData)
  {
    return this.http.post(this.BaseUrl + 'AddActor',FormData,{withCredentials:true}).pipe();
  }
  GetActor(id:number):Observable<ActorModel>
  {
    return this.http.get<ActorModel>(this.BaseUrl + 'GetActor/' + id,this.headers).pipe();
  }
  EditActor(formData:FormData):Observable<ActorModel>
  {
    return this.http.put<ActorModel>(this.BaseUrl + 'EditActor',formData,{withCredentials:true}).pipe();
  }
  DeleteActor(id :number):Observable<ActorModel>
  {
    return this.http.delete<ActorModel>(this.BaseUrl + 'DeleteActor/' + id,this.headers).pipe();
  }
  GetAllMovies():Observable<Movie[]>
  {
    return this.http.get<Movie[]>(this.BaseUrl + 'GetAllMovies',this.headers).pipe();
  }
  AddMovie(fd: FormData) {
    return this.http.post(this.BaseUrl + 'AddMovie', fd, { withCredentials: true }).pipe();
  }
  SearchMovie(search: string):Observable<Movie[]>
  {
    return this.http.get<Movie[]>(this.BaseUrl + 'SearchMovie/' + search ,this.headers).pipe();
  }
  GetMovie(id: number): Observable<Movie>
  {
    return this.http.get<Movie>(this.BaseUrl + 'GetMovie/' + id, this.headers).pipe();
  }
  EditMovie(formData:FormData):Observable<Movie>
  {
    return this.http.put<Movie>(this.BaseUrl + 'EditMovie',formData,{withCredentials:true}).pipe();
  }
  DeleteMovie(id :number):Observable<Movie>
  {
    return this.http.delete<Movie>(this.BaseUrl + 'DeleteMovie/' + id,this.headers).pipe();
  }
  GetAllMovieLinks(search: string):Observable<MovieLinks[]>
  {
    return this.http.get<MovieLinks[]>(this.BaseUrl + 'GetAllMovieLinks/' + search,this.headers).pipe();
  }
  AddMovieLink(model:MovieLinks):Observable<MovieLinks>
  {
    return this.http.post<MovieLinks>(this.BaseUrl + 'AddMovieLink',model, this.headers).pipe();
  }
  GetMovieLinkById(id:number):Observable<MovieLinks>
  {
    return this.http.get<MovieLinks>(this.BaseUrl + 'GetMovieLinkById/' + id, this.headers).pipe();
  }
  EditMovieLink(formData:FormData): Observable<MovieLinks>
  {
    return this.http.put<MovieLinks>(this.BaseUrl + 'EditMovieLink',formData,{withCredentials:true}).pipe();
  }
  GetAllMovieActors(search:string): Observable<MovieActor[]>
  {
    return this.http.get<MovieActor[]>(this.BaseUrl + 'GetAllMovieActors/' + search,this.headers).pipe();
  }
  AddMovieActor(model:MovieActor):Observable<MovieActor>
  {
    return this.http.post<MovieActor>(this.BaseUrl + 'AddMovieActor',model, this.headers).pipe();
  }
  GetMovieActorById(id:number):Observable<MovieActor>
  {
     return this.http.get<MovieActor>(this.BaseUrl + 'GetMovieActorById/' + id, this.headers).pipe();
  }
  EditMovieActor(model:MovieActor): Observable<MovieActor>
  {
    return this.http.put<MovieActor>(this.BaseUrl + 'EditMovieActor',model,this.headers).pipe();
  }
}
