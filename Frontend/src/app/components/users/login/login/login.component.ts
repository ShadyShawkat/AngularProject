import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPassword } from 'src/app/custom-valdiations/matchPassword';
import { usernamePatternValidation } from 'src/app/custom-valdiations/validatePattern';
import { ManageusersService } from 'src/app/services/manageusers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private manageusersService:ManageusersService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  
  get email()
  {
    return this.loginForm.get('email');
  }

  get password()
  {
    return this.loginForm.get('password');
  }


  loginForm=this.fb.group({
    password:['',[Validators.required,Validators.minLength(5)]],
    email:['',[Validators.required,usernamePatternValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  });




  onSubmit()
  {
    this.manageusersService.login(this.loginForm.value).subscribe(
      response=>{
        console.log(response.headers.get('x-auth-token'));
        console.log(response.body);
        localStorage.setItem('x-auth-token',response.headers.get('x-auth-token'))
        localStorage.setItem('currentUser',JSON.stringify(response.body))
      }
    )
  }

}
