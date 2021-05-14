import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGenre } from 'src/app/models/IGenre';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:string = '';
  genres:IGenre[] = [];

  constructor(
    private movieService: MovieService,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private genreService: GenreService,
            ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['_id'];
    });
    this.genreService.GetAllGenres().subscribe(genres => {
      this.genres = genres;
    })
    this.movieService.GetMovieById(this.id).subscribe(movie=>{
      this.editForm.setValue({
        title: movie.title,
        genreId: movie.genre?._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      });
    });
  }

  get title()
  {
    return this.editForm.get('title');
  }

  get genreId()
  {
    return this.editForm.get('genreId');
  }

  get numberInStock()
  {
    return this.editForm.get('numberInStock');
  }

  get dailyRentalRate()
  {
    return this.editForm.get('dailyRentalRate');
  }

  editForm=this.fb.group({
    title:['',[Validators.required,Validators.minLength(10),Validators.maxLength(200)]],
    genreId:['',[Validators.required]],
    numberInStock:[0,[Validators.required,Validators.min(0)]],
    dailyRentalRate:[0,[Validators.required,Validators.min(0)]],
  });

  onSubmit()
  {    
    this.movieService.PutMovie(this.id, {
      title:this.title?.value,
      genreId:this.genreId?.value,
      numberInStock: this.numberInStock?.value,
      dailyRentalRate: this.dailyRentalRate?.value,
    }).subscribe();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/movies']);
  }
}
