import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';


import { GenreComponent } from './components/genre/genre.component';
import { CreateGenreComponent } from './components/genre/create-genre/create-genre.component';
import { EditComponent } from './components/genre/edit/edit.component';
import { LoginComponent } from './components/users/login/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'genres', component: GenreComponent},
  {path:'genres/create',component:CreateGenreComponent},
  {path:'genres/edit/:_id',component:EditComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
