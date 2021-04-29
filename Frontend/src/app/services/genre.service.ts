import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre } from '../models/IGenre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  GetAllGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>('http://localhost:1998/api/genres');
  }
}
