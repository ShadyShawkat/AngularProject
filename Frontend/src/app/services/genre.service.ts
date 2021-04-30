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

  GetGenreById(id: string): Observable<IGenre> {
    return this.http.get<IGenre>(`http://localhost:1998/api/genres/${id}`);
  }

  PostGenre(genre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(`http://localhost:1998/api/genres/`,genre);
  }

  PutGenre(id: string, genre: IGenre): Observable<IGenre> {
    return this.http.put<IGenre>(`http://localhost:1998/api/genres/${id}`,genre);
  }

  DeleteGenre(id: string) {
    return this.http.delete<IGenre>(`http://localhost:1998/api/genres/${id}`);
  }
}
