import { Component, OnInit } from '@angular/core';
import { ManageusersService } from 'src/app/services/manageusers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from 'src/app/custom-valdiations/matchPassword';
import { usernamePatternValidation } from 'src/app/custom-valdiations/validatePattern';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private manageusersService:ManageusersService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  get name()
  {
    return this.registerForm.get('name');
  }


  get email()
  {
    return this.registerForm.get('email');
  }

  get password()
  {
    return this.registerForm.get('password');
  }

  get confirmPassword()
  {
    return this.registerForm.get('confirmPassword');
  }
  registerForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(5)]],
    confirmPassword:['',[Validators.required]],
    email:['',[Validators.required,usernamePatternValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  },{validators:[matchPassword]});


isEmailAlreadyUsed:boolean = false;

  onSubmit()
  {
    this.manageusersService.registerNewUser(this.registerForm.value).subscribe(
      response=>{
      this.isEmailAlreadyUsed=false;
        console.log(typeof response.status,response.status)
        console.log(response.headers.get('x-auth-token'));
        console.log(response.body);
        localStorage.setItem('x-auth-token',response.headers.get('x-auth-token')?? "")
        localStorage.setItem('currentUser',JSON.stringify(response.body))
      }
    ,err=>{
      this.isEmailAlreadyUsed=true;
    })

  }
}
