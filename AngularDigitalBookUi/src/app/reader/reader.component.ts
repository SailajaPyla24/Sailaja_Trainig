import { Component, OnInit } from '@angular/core';
import { BooksService } from '../bookservice.component';
import { Router } from '@angular/router';
import { bookModel } from 'src/books.component';
@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  book:any;
  bookId:any;



 constructor(public bookServiceComponent : BooksService,private router:Router){
  }



 ngOnInit(): void {
  
      this.bookServiceComponent.getAllBooks()
      .subscribe(
        response => { this.book = response;}
      );
    
  }
  onSubmit(bookId:any)
   {
     console.log('bookId', bookId);
   this.router.navigate(['ViewContent/',bookId]);
  }




}