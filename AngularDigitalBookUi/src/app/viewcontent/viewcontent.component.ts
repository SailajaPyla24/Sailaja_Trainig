import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../bookservice.component';



@Component({
  selector: 'app-viewcontent',
  templateUrl: './viewcontent.component.html',
  styleUrls: ['./viewcontent.component.css']
})
export class ViewcontentComponent implements OnInit {
  books:any;
  book:any
  bookId:any;
  constructor(public bookServiceComponent : BooksService, private route:ActivatedRoute) {



  }



 ngOnInit(): void {



   this.bookId = this.route.snapshot.paramMap.get('bookId');
      console.log(this.bookId);



   this.bookServiceComponent.getBookInfo(this.bookId)
      .subscribe(
        response => { this.book = response;}
      );
  }



}