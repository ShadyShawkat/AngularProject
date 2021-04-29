import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { RegisterComponent } from './components/users/register/register.component';
=======
import { GenreComponent } from './components/genre/genre.component';
>>>>>>> 2db5eba5b1945fd0733f89dc2aeeb871a40aadce

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    RegisterComponent
=======
    GenreComponent,
>>>>>>> 2db5eba5b1945fd0733f89dc2aeeb871a40aadce
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule,
    ReactiveFormsModule
=======
    HttpClientModule
>>>>>>> 2db5eba5b1945fd0733f89dc2aeeb871a40aadce
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
