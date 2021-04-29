import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../models/IUser';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManageusersService {

  constructor(private http:HttpClient) { }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }



  registerNewUser(newUser:IUser)
  {
    const u:IUser = {name:newUser.name, email:newUser.email, password:newUser.password};
    console.log(u);

    /** POST: add a new hero to the database */
    return this.http.post('http://localhost:1998/api/users', u,{ observe: 'response' })
    .pipe(catchError((err)=>{
      return throwError(err.message || "Internal Server Error Please contact site adminstarator")
    })
    )



    // this.http.post('http://localhost:1998/api/users', u,{ observe: 'response' }).toPromise().then(response => console.log(response.headers.get('x-auth-token')));
  }

  login(user:IUser)
  {
    const u:IUser = {email:user.email, password:user.password};
    console.log(u);

    /** POST: add a new hero to the database */
    return this.http.post('http://localhost:1998/api/auth', u,{ observe: 'response' })
    .pipe(catchError((err)=>{
      return throwError(err.message || "Internal Server Error Please contact site adminstarator")
    })
    )



    // this.http.post('http://localhost:1998/api/users', u,{ observe: 'response' }).toPromise().then(response => console.log(response.headers.get('x-auth-token')));
  }





}
