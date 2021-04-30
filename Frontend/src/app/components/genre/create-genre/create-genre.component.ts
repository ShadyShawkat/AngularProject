import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.scss']
})
export class CreateGenreComponent implements OnInit {

  constructor(private genreService: GenreService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  get name()
  {
    return this.createGenreForm.get('name');
  }

  createGenreForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
  });

  onSubmit()
  {
    this.genreService.PostGenre(this.createGenreForm.value).subscribe();
    this.router.navigate(['/genres']);
  }
}
