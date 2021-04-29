import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { RegisterComponent } from './components/users/register/register.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},

=======
import { GenreComponent } from './components/genre/genre.component';

const routes: Routes = [
  {path:'genres', component: GenreComponent}
>>>>>>> 2db5eba5b1945fd0733f89dc2aeeb871a40aadce
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
