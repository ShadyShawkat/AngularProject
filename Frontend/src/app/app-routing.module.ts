import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';


import { GenreComponent } from './components/genre/genre.component';
import { CreateGenreComponent } from './components/genre/create-genre/create-genre.component';
import { EditComponent as GenreEditComponent } from './components/genre/edit/edit.component';
import { LoginComponent } from './components/users/login/login/login.component';
import { MovieComponent } from './components/movie/movie.component';
import { CreateComponent } from './components/movie/create/create.component';
import { EditComponent as MovieEditComponent } from './components/movie/edit/edit.component';

const routes: Routes = [
  {path:'genres', component: GenreComponent},
  {path:'genres/create',component:CreateGenreComponent},
  {path:'genres/edit/:_id',component:GenreEditComponent},
  {path:'movies',component:MovieComponent},
  {path:'movies/create',component:CreateComponent},
  {path:'movies/edit/:_id',component:MovieEditComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
