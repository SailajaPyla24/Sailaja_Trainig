import { Component, Input, OnInit } from '@angular/core';
import { purchase } from '../purchase';
import { BooksService } from '../bookservice.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  @Input() bookID:any;
  bookHistoryList : any =[];
  display = "none";

  objpurchase : purchase={
    PurchaseId: 0,
    EmailId : '',
    BookId : 0,
    PaymentMode : ''
    //IsRefunded : 'Y'
  }
  constructor(private services: BooksService) { }

  ngOnInit(): void {
    this.loadBookHistory();
  }

  loadBookHistory(){
    debugger;
    this.services.GetBookHistory(this.objpurchase.EmailId).subscribe(
      response => {this.bookHistoryList = response;
        this.display = "block";
      }
    )
  }

  onSubmit(){
    this.objpurchase.BookId = this.bookID;
    this.services.PurchaseBook(this.objpurchase).subscribe(
      response => { alert("Book Purchased Successfully.");
      this.loadBookHistory(); }
    )
  }
  onFocusOutEvent(event: any){
    this.loadBookHistory();
 }
 
}
