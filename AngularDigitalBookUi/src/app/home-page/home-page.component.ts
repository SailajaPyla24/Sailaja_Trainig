// import { getMissingNgModuleMetadataErrorData } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { bookModel } from 'src/books.component';
import { BooksService } from '../bookservice.component';
import { UserModel } from '../users.component';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  title = "DigitalBooksAngular";
  Logo="https://archinect.imgix.net/uploads/oj/ojnwgyv9um4gzgdg.JPG?auto=compress%2Cformat";



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
  publishedDate :new Date,
  content :'',
  active :true,
  userModel :this.user
  }
  constructor(public bookServiceComponent : BooksService){
  }



 ngOnInit(): void {
   
  }
  
       
  getAllBooks() {
    this.bookServiceComponent.getAllBooks()
    .subscribe(
      response => { this.books = response}
    );
  }



 onSubmit()
    {
      this.searchBook(this.book);
    }




searchBook(book: bookModel)
  {
    this.bookServiceComponent.searchBooks(book.bookName,book.userModel.userName,book.publisher,book.publishedDate).subscribe(
      response => { this.books = response});
  }
        }
    