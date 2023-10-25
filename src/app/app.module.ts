import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavItemComponent } from './Component/nav-item/nav-item.component';
import { HomeComponent } from './Component/home/home.component';
import { FooterComponent } from './Component/footer/footer.component';
import { RegisterComponent } from './Component/Account/register/register.component';
import { LoginComponent } from './Component/Account/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ForgetPasswordComponent } from './Component/Account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/Account/reset-password/reset-password.component';
import { RegisterconfirmComponent } from './Component/Account/registerconfirm/registerconfirm.component';
import { AdminComponent } from './Component/Dashboard/admin/admin.component';
import { UsersComponent } from './Component/Dashboard/Users/users/users.component';
import { AddUserComponent } from './Component/Dashboard/add-user/add-user.component';
import { UserRolesComponent } from './Component/Dashboard/user-roles/user-roles.component';
import { NotFoundComponent } from './Component/ErrorPages/not-found/not-found.component';
import { AccessDeniedComponent } from './Component/ErrorPages/access-denied/access-denied.component';
import { DashboardGaurdService } from './guards/dashboard-guard.service';
import { EditUserRoleComponent } from './Component/Dashboard/edit-user-role/edit-user-role.component';
import { CategoryListComponent } from './Component/Dashboard/Categories/category-list/category-list.component';
import { AddCategoryComponent } from './Component/Dashboard/Categories/add-category/add-category.component';
import { SubCategoryComponent } from './Component/Dashboard/SubCategories/sub-category/sub-category.component';
import { AddsubCategoryComponent } from './Component/Dashboard/SubCategories/addsub-category/addsub-category.component';
import { AddActorComponent } from './Component/Dashboard/Actors/add-actor/add-actor.component';
import { ActorListComponent } from './Component/Dashboard/Actors/actor-list/actor-list.component';
import { MovieListComponent } from './Component/Dashboard/Movies/movie-list/movie-list.component';
import { AddMovieComponent } from './Component/Dashboard/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Component/Dashboard/Movies/edit-movie/edit-movie.component';
import { MovieLinkListComponent } from './Component/Dashboard/movieLinks/movie-link-list/movie-link-list.component';
import { EditMovieLinkComponent } from './Component/Dashboard/movieLinks/edit-movie-link/edit-movie-link.component';
import { MovieActorListComponent } from './Component/Dashboard/MovieActor/movie-actor-list/movie-actor-list.component';
import { EditMovieActorComponent } from './Component/Dashboard/MovieActor/edit-movie-actor/edit-movie-actor.component';
import { MovieDetailsComponent } from './Component/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavItemComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    RegisterconfirmComponent,
    AdminComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    EditUserRoleComponent,
    CategoryListComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    AddsubCategoryComponent,
    AddActorComponent,
    ActorListComponent,
    MovieListComponent,
    AddMovieComponent,
    EditMovieComponent,
    MovieLinkListComponent,
    EditMovieLinkComponent,
    MovieActorListComponent,
    EditMovieActorComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DashboardGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
