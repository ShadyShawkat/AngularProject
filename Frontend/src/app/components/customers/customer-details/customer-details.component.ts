import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICustomer } from 'src/app/models/ICustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})

export class CustomerDetailsComponent implements OnInit {

  currentCustomer: any = null;

  constructor(
    private customerService: CustomersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
    ) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.getCustomer(params.get('id'));      
        })
    }

    showCustomerDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+(([_ -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]],
      isGold: false,
    });

    get name() {
      return this.showCustomerDetailsForm.get('name');
    }
  
    get phone() {
      return this.showCustomerDetailsForm.get('phone');
    }

  getCustomer(id: any): void {
    this.customerService.getCustomerById(id)
      .subscribe(
        data => {
          this.currentCustomer = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCustomer(): void {
    if(this.showCustomerDetailsForm.valid) {
      this.customerService.updateCustomer(this.currentCustomer._id, this.currentCustomer)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log(error);
        });
    }
    else console.log('The Username or Phone is Invalid.')
  }
 
}
