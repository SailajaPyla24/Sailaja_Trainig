import { Component, OnInit } from '@angular/core';
import { BooksService } from '../bookservice.component';
import { bookModel } from 'src/books.component';
import { UserModel } from '../users.component';
import { Category } from '../category';






@Component({
  selector: 'app-publishbook',
  templateUrl: './publishbook.component.html',
  styleUrls: ['./publishbook.component.css']
})
export class PublishbookComponent implements OnInit {





selectedObject='';
  categories:Category[]=[];
  category:Category={
    categoryId:0,
    categoryName:''
  }





users:UserModel[] = [];
  user : UserModel = {
    userId :0,
  userName :'',
  emailId :'',
  password :'',
  roleId :'',
  firstName :'',
  lastName :'',
  active : true
  }
  
  
  books:bookModel[] = [];
   book : bookModel = {
    bookId: 0,
  bookName :'',
  categoryId :'',
  price :'',
  publisher :'',
  userId:0,
  publishedDate : new Date(),
  content :'',
  active :true,
  userModel :this.user
  }
  
  constructor(public bookServiceComponent : BooksService){
  }





ngOnInit(): void {
   this. getAllUsers();
   this.bookServiceComponent.getAllBooks()
      .subscribe(
        response => { this.books = response;}
      );
  }
getAllBooks() {
    this.bookServiceComponent.getAllBooks()
    .subscribe(
      response => { this.books = response}
    );
  }
getAllUsers()
{
   this.bookServiceComponent.getAllUsers()
   .subscribe(
    response => { this.users = response}
  );




}





onSubmit()
    {
      this.AddBook(this.book);
    }
    AddBook(book: bookModel)
    {
      if(this.selectedObject=='Fiction')  
      {     this.book.categoryId='1';  }  
      else if(this.selectedObject=='comic')  
      {    this.book.categoryId='2';  }
       else{    this.book.categoryId='3';  }  





    const  selectedOrder = this.users.find(users => users.userName == this.user.userName);
      
       console.log(selectedOrder);
       this.book.userId=selectedOrder?.userId!;  
      this.book.bookId=0;
      
      this.bookServiceComponent.addBook(book)
      .subscribe(
        response => { this.books }
    );
    }
    dropdownselectionchange()
    {
      console.log(this.selectedObject)
    }
    
    






        }