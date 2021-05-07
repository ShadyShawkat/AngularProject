import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IRental } from '../models/IRental';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(private http:HttpClient) { }



  addNewRental(newRental:IRental)
  {
    const u:IRental = {movieId:newRental.movieId,customerId:newRental.customerId};
    console.log(u);

    /** POST: add a new hero to the database */
    return this.http.post('http://localhost:1998/api/rentals', u,{ observe: 'response' })
    .pipe(catchError((err)=>{
      return throwError(err.message || "Internal Server Error Please contact site adminstarator")
    })
    )



    // this.http.post('http://localhost:1998/api/users', u,{ observe: 'response' }).toPromise().then(response => console.log(response.headers.get('x-auth-token')));
  }


  getAllRentals():Observable<IRental[]>
  {
   return this.http.get<IRental[]>("http://localhost:1998/api/rentals").pipe(catchError((err)=>{
     return throwError(err.message || "Internal Server Error Please contact site adminstarator")
   })
   )
  }


  return(rental:IRental){
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('x-auth-token'),
      });
  let options = { headers: headers };
  
    console.log({customerId:rental.customer?._id,movieId:rental.movie._id},'returned')
    return this.http.post('http://localhost:1998/api/returns', {customerId:rental.customer?._id,movieId:rental.movie._id},options)
    .pipe(catchError((err)=>{
      return throwError(err.message || "Internal Server Error Please contact site adminstarator")
    })
    )
  }
}
