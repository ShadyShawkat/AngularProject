import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRental } from 'src/app/models/IRental';
import { RentalsService } from 'src/app/services/rentals.service';

@Component({
  selector: 'app-show-all-rentals',
  templateUrl: './show-all-rentals.component.html',
  styleUrls: ['./show-all-rentals.component.scss']
})
export class ShowAllRentalsComponent implements OnInit {

  constructor(private rentalsService:RentalsService,private router: Router) { }
Rentals:IRental[];
errorMessage:string;
return(d:any){
  console.log(d)
  this.rentalsService.return(d).subscribe(
    returned =>
    {
      this.router.navigate(['/home'])

    },
    responseError=>
    {
      this.errorMessage=responseError;
    }
  )
}
  ngOnInit(): void {
    this.rentalsService.getAllRentals().subscribe(
      rentals =>
      {
        this.Rentals = rentals; ;
      },
      responseError=>
      {
        this.errorMessage=responseError;
      }
    )
  }

}
