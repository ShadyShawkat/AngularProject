import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IMovie } from '../models/IMovie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  GetAllMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('http://localhost:1998/api/movies');
  }

  GetMovieById(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`http://localhost:1998/api/movies/${id}`);
  }

  PostMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`http://localhost:1998/api/movies/`, movie);
  }

  PutMovie(id: string, movie: IMovie): Observable<IMovie> {
    return this.http.put<IMovie>(`http://localhost:1998/api/movies/${id}`, movie);
  }

  DeleteMovie(id: string) {
    return this.http.delete<IMovie>(`http://localhost:1998/api/movies/${id}`);
  }
}
