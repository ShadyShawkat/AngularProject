import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGenre } from 'src/app/models/IGenre';
import { IMovie } from 'src/app/models/IMovie';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies: IMovie[] = [];

  constructor(private movieService: MovieService, private router: Router, private genreService: GenreService) { }

  ngOnInit(): void {
    this.movieService.GetAllMovies().subscribe(movies => {
      this.movies = movies;
    })
  }

  DeleteMovie(_id:string)
  {
    this.movieService.DeleteMovie(_id).subscribe( ()=> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/movies']); 
    });
  }

}
