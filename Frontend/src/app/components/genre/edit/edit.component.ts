import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGenre } from 'src/app/models/IGenre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:string = '';
  constructor(private genreService: GenreService, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['_id'];
    });
    this.genreService.GetGenreById(this.id).subscribe(genre=>{
      this.editForm.setValue({
        name: genre.name,
      });
    });
  }

  get name()
  {
    return this.editForm.get('name');
  }

  editForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
  });

  onSubmit()
  {
    // let genre:IGenre = {
    //   _id:this.id,
    //   name:this.name?.value,
    // }

    // console.log({
    //   _id:this.id,
    //   name:this.name?.value,
    // });
    
    this.genreService.PutGenre(this.id, {
      name:this.name?.value,
    }).subscribe();
    this.router.navigate(['/genres']);
  }
}
