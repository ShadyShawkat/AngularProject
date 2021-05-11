import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  checkToken=()=>{if(localStorage.getItem('x-auth-token')) return true;
return false;};
onLogout = ()=>{localStorage.removeItem('x-auth-token');}


  title = 'Frontend';
}
