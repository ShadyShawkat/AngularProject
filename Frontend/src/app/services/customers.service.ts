import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICustomer } from '../models/ICustomer';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json; charset=UTF-8',
  })
}

const baseURL = 'http://localhost:1998/api/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(baseURL).pipe(catchError((err) => {
      return throwError(err.message || 'This URL is Not Valid, Please Try Again');
    }));
  }

  getCustomerById(customerId: string): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${baseURL}${customerId}`).pipe(catchError((err) => {
      return throwError(err.message || 'Please Try Again');
    }));
  }

  addCustomer(data: ICustomer): Observable<any> {
    return this.http.post(baseURL, data, httpOptions).pipe(catchError((err) => {
      return throwError(err.message || 'Please Try Again');
    }));
  }

  updateCustomer(customerId: string, data: ICustomer): Observable<any> {
    return this.http.put(`${baseURL}${customerId}`, data, httpOptions).pipe(catchError((err) => {
      return throwError(err.message || 'Please Try Again');
    }));
  }

  deleteCustomer(customerId: string): Observable<any> {
    return this.http.delete(`${baseURL}${customerId}`).pipe(catchError((err) => {
      return throwError(err.message || 'Please Try Again');
    }));
  }

  deleteAllCustomers(): Observable<any> {
    return this.http.delete(baseURL);
  }

  // findCustomerByName(name: string): Observable<ICustomer[]> {
  //   return this.http.get<ICustomer[]>(`${baseURL}?name=${name}`);
  // }
}
