import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/ICustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

customers: any;
currentCustomer: any;
searchCustomer: any;
currentIndex = -1;
name = '';

constructor(
  private customerService: CustomersService,
  private fb: FormBuilder,
  private router: Router
  ) { }


  ngOnInit(): void {
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
    this.customerService.getAllCustomers()
      .subscribe(
        data => {
          this.customers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id)
      .subscribe(
        response => {
          console.log(response);
          // this.router.navigate(['/customers']);
        },
        error => {
          console.log(error);
        });
  }
}
