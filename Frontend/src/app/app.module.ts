import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/users/register/register.component';
import { GenreComponent } from './components/genre/genre.component';
import { CreateGenreComponent } from './components/genre/create-genre/create-genre.component';
import { EditComponent } from './components/genre/edit/edit.component';
import { LoginComponent } from './components/users/login/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddrentalComponent } from './components/rentals/add rental/addrental/addrental.component';
import { ShowAllRentalsComponent } from './components/rentals/show-all-rentals/show-all-rentals.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    GenreComponent,
    LoginComponent,
    HomeComponent,
    CreateGenreComponent,
    EditComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    CustomerListComponent,
    AddrentalComponent,
    ShowAllRentalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
