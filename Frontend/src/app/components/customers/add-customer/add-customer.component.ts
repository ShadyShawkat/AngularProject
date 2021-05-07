import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ICustomer } from 'src/app/models/ICustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  constructor(
    private customerService: CustomersService, 
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  addCustomerForm = this.fb.group({ 
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+(([_ -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]],
    isGold: false,
    alternativePhone: this.fb.array([])
  });

  get name() {
    return this.addCustomerForm.get('name');
  }

  get phone() {
    return this.addCustomerForm.get('phone');
  }

  get alternativePhone() {
    return this.addCustomerForm.get('alternativePhone') as FormArray
  }

  submitted = false;

  saveCustomer(): void {
    const data = <ICustomer> {
      name: this.name?.value,
      phone: this.phone?.value
    };

    this.customerService.addCustomer(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCustomer(): void {
    this.submitted = false;
    this.addCustomerForm.get('name')?.setValue('');
    this.addCustomerForm.get('phone')?.setValue('');
    // this.addCustomerForm.markAsUntouched;
  }

  addNewPhone() {
    this.alternativePhone.push(this.fb.control(''))
  }

  removePhone(index: number) {
    this.alternativePhone.removeAt(index);
  }
}
