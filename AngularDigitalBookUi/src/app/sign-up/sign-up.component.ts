import { Component, OnInit } from '@angular/core';
import { BooksService } from '../bookservice.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { Roles } from '../roles';
import { UserModel } from '../users.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {



 roles:Roles[]=[];
  role:Roles={
    roleId:'',
    roleName:''
    
  }
  users:UserModel[]=[];
  user:UserModel={
    userId:0,
    userName:'',
    emailId:'',
    password:'',
    roleId:'',
    firstName:'',
    lastName:'',
    active:true
  }
  constructor(private Services:BooksService) { }





ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.user);
    this.Services.postUser(this.user).subscribe(response=>this.users);
  }



 onUserRoleid(){
    console.log('reader');
    this.user.roleId='2';



 }
  onAuthorRoleid(){
    console.log('author');
    this.user.roleId='1';
  }
  // postUser(user: UserModel)
  // {
  //   this.Services.postUser().subscribe(
  //     response => { this.user = response});
  // }
}