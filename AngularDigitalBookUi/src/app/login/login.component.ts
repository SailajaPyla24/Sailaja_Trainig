import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { UserModel } from '../users.component';
import { BooksService } from '../bookservice.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  users: UserModel[] = [];
  user: UserModel = {
    userId: 0,
    userName: '',
    emailId: '',
    password: '',
    roleId: '',
    firstName: '',
    lastName: '',
    active: true
  }
  token: string = '';
  isAuthenticated: boolean = false;
  response: any;




  //  uservalidations:Login[]=[];
  //   uservalidation:Login={
  //     username:'',
  //     password:''
  //   }
  constructor(private service: BooksService, private router: Router, private http: HttpClientModule,private appComponent:AppComponent) { }







  ngOnInit(): void {
  }
  onSubmit() {
    // this.Services.postUser(this.user).subscribe(response=>this.users);

    //   this.service.ValidateUsers(this.uservalidation).subscribe(response=>this.users);



    this.service.loginuser(this.user).subscribe(
      response => {
        this.response = response;

        if (response.isAuthenticated == true) {
         // alert('Login Successful');
          localStorage.setItem("Token", response.token);
          localStorage.setItem('UserTable', JSON.stringify(this.response.userTable));
          let values = JSON.parse(localStorage.getItem("UserTable") || '');
          this.appComponent.emailId=values.emailId;
          this.appComponent.userName=values.userName;
         this.appComponent.Islogoutshow=true;
        }
        else {
          alert('User not authenticated');
          this.appComponent.Islogoutshow=false;
        }
        if (this.response.userTable.roleId == 1) {
          console.log(this.response.userTable.roleId);
          this.router.navigate(["AvailableBooks"]);
          this.appComponent.IsAuthormoduleshow=true;
          this.appComponent.IsReadermoduleshow=false;
        }
        else if (this.response.userTable.roleId == 2) {
          this.router.navigate(["home"]);
          this.appComponent.IsReadermoduleshow=true;
          this.appComponent.IsAuthormoduleshow=false;
        }


      }

    );

  }
}