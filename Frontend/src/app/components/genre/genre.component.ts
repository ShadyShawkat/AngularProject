import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGenre } from 'src/app/models/IGenre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  genres: IGenre[] = [];

  constructor(private genreService: GenreService, private router: Router) { }

  ngOnInit(): void {
    this.genreService.GetAllGenres().subscribe(genres => {
      this.genres = genres;
    })
  }

  DeleteGenre(_id:string)
  {
    this.genreService.DeleteGenre(_id).subscribe( ()=> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/genres']); 
    });
  }
}
