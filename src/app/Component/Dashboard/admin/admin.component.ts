import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  implements OnInit{
  isUserList!:boolean;
  isAddUser!:boolean;
  isUserRole!:boolean;
  isCategory!:boolean;
  isSubCategory!:boolean;
  isActor!:boolean;
  isMovie!:boolean;
  isMovieLink!:boolean;
  isMovieActor!:boolean;
  constructor()
  {}
  ngOnInit(): void {
    this.isUserList= false;
    this.isAddUser= false;
    this.isCategory = false;
    this.isUserRole = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });

  if(sessionStorage.getItem('editUserRole'))
  {
    this.UserRole();
    sessionStorage.removeItem('editUserRole');
  }
  else if (sessionStorage.getItem("cat")) {
    this.Category();
    sessionStorage.removeItem("cat");
  }
  else if (sessionStorage.getItem("subcat")) {
    this.SubCategory();
    sessionStorage.removeItem("subcat");
  }
  else if (sessionStorage.getItem("actor")) {
    this.Actor();
    sessionStorage.removeItem("actor");
  }
  else if (sessionStorage.getItem("movie")) {
    this.Movie();
    sessionStorage.removeItem("movie");
  }
  else if (sessionStorage.getItem("movielink")) {
    this.MovieLinks();
    sessionStorage.removeItem("movielink");
  }
  else if (sessionStorage.getItem("movieActor")) {
    this.MovieActors();
    sessionStorage.removeItem("movieActor");
  }
  }
  CheckUser():boolean
  {
    this.isCategory = false;
    this.isAddUser = false;
    this.isUserRole = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
   return this.isUserList = true;
  }
  CheckAddUser():boolean
  {
    this.isCategory = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
   return this.isAddUser = true;
  }
  UserRole()
  {
    this.isCategory = false;
    this.isAddUser = false;
    this.isUserList = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    return this.isUserRole = true;
  }
  Category()
  {
    this.isUserList = false;
    this.isUserRole = false;
    this.isAddUser = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    return this.isCategory = true;
  }
  SubCategory()
  {
    this.isAddUser = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    return this.isSubCategory = true;
  }
  Actor()
  {
    this.isAddUser = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isCategory = false;
    this.isSubCategory = false;
    this.isMovie = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    return this.isActor = true;
  }
  Movie()
  {
    this.isAddUser = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isCategory = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovieLink = false;
    this.isMovieActor = false;
    return this.isMovie = true;
  }
  MovieLinks()
  {
    this.isAddUser = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isCategory = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieActor = false;
    return this.isMovieLink = true;
  }
  MovieActors()
  {
    this.isAddUser = false;
    this.isUserList = false;
    this.isUserRole = false;
    this.isCategory = false;
    this.isSubCategory = false;
    this.isActor = false;
    this.isMovie = false;
    this.isMovieLink = false;
    return this.isMovieActor = true;
  }
}
