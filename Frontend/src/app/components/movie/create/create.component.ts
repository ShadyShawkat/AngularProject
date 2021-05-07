import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IGenre } from 'src/app/models/IGenre';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  genres:IGenre[] = [];

  constructor(private movieService: MovieService, private fb:FormBuilder, private router:Router, private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.GetAllGenres().subscribe(genres => {
      this.genres = genres;
    })
  }

  get title()
  {
    return this.createMovieForm.get('title');
  }

  get genreId()
  {
    return this.createMovieForm.get('genreId');
  }

  get numberInStock()
  {
    return this.createMovieForm.get('numberInStock');
  }

  get dailyRentalRate()
  {
    return this.createMovieForm.get('dailyRentalRate');
  }

  createMovieForm=this.fb.group({
    title:['',[Validators.required,Validators.minLength(10),Validators.maxLength(200)]],
    genreId:['',[Validators.required]],
    numberInStock:[0,[Validators.required,Validators.min(0)]],
    dailyRentalRate:[0,[Validators.required,Validators.min(0)]],
  });

  GetGenreName(genreId:string):string
  {
    let genre:IGenre = {name:""};
    this.genreService.GetGenreById(genreId).subscribe(g => genre = g);
    return genre.name;
  }

  onSubmit()
  {
    this.movieService.PostMovie(this.createMovieForm.value).subscribe();
    this.router.navigate(['/movies']);
  }
}
