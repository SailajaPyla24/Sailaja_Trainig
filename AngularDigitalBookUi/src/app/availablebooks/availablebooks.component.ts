import { Component, OnInit } from '@angular/core';
import { BooksService } from '../bookservice.component';



@Component({
  selector: 'app-availablebooks',
  templateUrl: './availablebooks.component.html',
  styleUrls: ['./availablebooks.component.css']
})
export class AvailablebooksComponent implements OnInit {
  books:any;
  activeBooks:any
  userID :number=0;
  userIDs:string='';
  constructor(public bookServiceComponent : BooksService){
  }
  GetUserID(){
    let values = JSON.parse(localStorage.getItem("UserTable") || '');
    this.userID = values.userId;
    this.userIDs = values.userId;





  
  }
  ngOnInit(): void {
    this.GetUserID();
  this.bookServiceComponent.getAllBooks();
      this.bookServiceComponent.getAllBooksauth(this.userIDs)
      .subscribe(
        response => { this.books = response;}
      );
    
  }
  deactivatebook(id:number){
    // this.book.active=false;
    this.bookServiceComponent.deactivatebook(id).subscribe(
      response =>{
        this.bookServiceComponent.getAllBooks();
      }
    );
   window.location.reload();
    }
    
  update(id:number,content:string)
  {
    this.bookServiceComponent.updatebook(id,content).subscribe(
      response =>{
        this.bookServiceComponent.getAllBooks();
        alert('Book content Updated');
      }
    );
  }



}