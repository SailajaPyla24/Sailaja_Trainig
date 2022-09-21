import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



 title = 'AngularDigitalBookUi';
   userName='';
 emailId='';
 IsAuthormoduleshow=false;
 IsReadermoduleshow=false;
 Islogoutshow=false;

constructor(private router:Router){}



 signOutClick() {
    // remove user from local storage to log user out
  localStorage.removeItem("UserTable");
  localStorage.removeItem("Token");
  this.emailId='';
  this.userName='';
  this.Islogoutshow=false;
  this.IsReadermoduleshow=false;
  this.IsAuthormoduleshow=false;
    this.router.navigate(['/Login']);          
  }
}