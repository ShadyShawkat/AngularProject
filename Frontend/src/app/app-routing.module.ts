import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';


import { GenreComponent } from './components/genre/genre.component';

const routes: Routes = [
  {path:'genres', component: GenreComponent},
  {path:'register',component:RegisterComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
