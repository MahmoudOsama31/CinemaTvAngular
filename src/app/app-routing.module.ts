import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/Account/login/login.component';
import { RegisterComponent } from './Component/Account/register/register.component';
import { ForgetPasswordComponent } from './Component/Account/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/Account/reset-password/reset-password.component';
import { RegisterconfirmComponent } from './Component/Account/registerconfirm/registerconfirm.component';
import { AdminComponent } from './Component/Dashboard/admin/admin.component';
import { AddUserComponent } from './Component/Dashboard/add-user/add-user.component';
import { UserRolesComponent } from './Component/Dashboard/user-roles/user-roles.component';
import { NotFoundComponent } from './Component/ErrorPages/not-found/not-found.component';
import { AccessDeniedComponent } from './Component/ErrorPages/access-denied/access-denied.component';
import { DashboardGaurdService } from './guards/dashboard-guard.service';
import { EditUserRoleComponent } from './Component/Dashboard/edit-user-role/edit-user-role.component';
import { AddCategoryComponent } from './Component/Dashboard/Categories/add-category/add-category.component';
import { CategoryListComponent } from './Component/Dashboard/Categories/category-list/category-list.component';
import { AddsubCategoryComponent } from './Component/Dashboard/SubCategories/addsub-category/addsub-category.component';
import { ActorListComponent } from './Component/Dashboard/Actors/actor-list/actor-list.component';
import { AddActorComponent } from './Component/Dashboard/Actors/add-actor/add-actor.component';
import { AddMovieComponent } from './Component/Dashboard/Movies/add-movie/add-movie.component';
import { EditMovieComponent } from './Component/Dashboard/Movies/edit-movie/edit-movie.component';
import { EditMovieLinkComponent } from './Component/Dashboard/movieLinks/edit-movie-link/edit-movie-link.component';
import { EditMovieActorComponent } from './Component/Dashboard/MovieActor/edit-movie-actor/edit-movie-actor.component';
import { MovieDetailsComponent } from './Component/movie-details/movie-details.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"home/:id",component:HomeComponent},
  {path:"Register",component:RegisterComponent},
  {path:'registerconfirm',component:RegisterconfirmComponent },
  {path:"Login",component:LoginComponent},
  {path:"forgetPassword",component:ForgetPasswordComponent},
  {path:"ResetPassword",component:ResetPasswordComponent},
  {path:"controlpanel",component:AdminComponent,canActivate:[DashboardGaurdService]},
  {path:"editUser/:id",component:AddUserComponent},
  {path:"userRoles",component:UserRolesComponent},
  {path:"notFound",component:NotFoundComponent},
  {path:"accessDenied",component:AccessDeniedComponent},
  {path:"editUserRole/:id/:id1",component:EditUserRoleComponent},
  {path:"categoryList",component:CategoryListComponent},
  { path: 'category', component: AddCategoryComponent },
  { path: 'editcategory/:id/:id1', component: AddCategoryComponent },
  { path: 'subcategory', component: AddsubCategoryComponent },
  {path:"editsubcategory/:id/:id1/:id2",component:AddsubCategoryComponent},
  {path:"actorList",component:ActorListComponent},
  { path: 'addactor', component: AddActorComponent },
  { path: 'editactor/:id', component: AddActorComponent },
  { path: 'addmovie', component: AddMovieComponent },
  { path: 'editmovie/:id', component: EditMovieComponent },
  { path: 'addmovielink', component: EditMovieLinkComponent },
  { path: 'editmovielinks/:id', component: EditMovieLinkComponent },
  { path: 'addmovieactor', component: EditMovieActorComponent },
  { path: 'editmovieactors/:id', component: EditMovieActorComponent },
  { path: 'getMovie/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
