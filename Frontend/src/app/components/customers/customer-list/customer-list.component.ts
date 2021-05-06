import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
searched = false;
currentIndex = -1;
name = '';

constructor(
  private customerService: CustomersService,
  private fb: FormBuilder
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

  // refreshList(): void {
  //   this.retrieveCustomers();
  //   this.currentCustomer = null;
  //   this.currentIndex = -1;
  // }

  setActiveCustomer(customer: ICustomer, index: number): void {
    console.log(customer);
    
    this.currentCustomer = customer;
    this.currentIndex = index;
  }

  removeAllCustomers(): void {
    this.customerService.deleteAllCustomers()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveCustomers();
        },
        error => {
          console.log(error);
        });
  }

  // searchOnCustomerByName(): void {
  //   this.customerService.findCustomerByName(this.name)
  //     .subscribe(
  //       data => {
  //         this.searchCustomer = data;
  //         console.log(data);
  //         this.searched = true;
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
}
