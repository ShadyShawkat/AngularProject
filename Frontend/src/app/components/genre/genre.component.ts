import { Component, OnInit } from '@angular/core';
import { IGenre } from 'src/app/models/IGenre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  genres: IGenre[] = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.GetAllGenres().subscribe(genres => {
      this.genres = genres;
      this.genres.push({name: 'shads'});
    })
  }


}
