import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookModel } from 'src/books.component';
import { Login } from './login';
import { UserModel } from './users.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { purchase } from './purchase';




@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
baseUrl = 'https://localhost:44349/api/Books';
userUrl='https://localhost:44349/api/UserTables';
Authoruserurl ='https://localhost:44347/api/UserTables';
AuthorBookurl ='https://localhost:44347/api/Books';
validateUrl='https://localhost:44325/validate';
purchaseURL='https://localhost:44349/api/Purchases';
historyURL ='https://localhost:44349/api/Purchases';



constructor(private http: HttpClient) { }



//Get all Books
  getAllBooks():Observable<bookModel[]>{
      return this.http.get<bookModel[]>(this.baseUrl);
  }
  getAllUsers():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.userUrl);
}
  //search books by details
  searchBooks(Bname:string,Author:string,Publisher:string,publishedDate:Date):Observable<bookModel[]>{
    return this.http.get<bookModel[]>(this.baseUrl +'/SearchBook?BName='+Bname+'&Author='+Author+'&Publisher='+Publisher+'&publishedDate='+publishedDate);
  
  }



 addBook(book: bookModel):Observable<bookModel> {
    return this.http.post<bookModel>(this.AuthorBookurl, book);
  }



 ValidateUsers(userValidation:Login):Observable<Login>
{
  return this.http.post<Login>(this.validateUrl,userValidation);
}
  
postUser(user: UserModel):Observable<UserModel>
{
  console.log('checking');
if(user.roleId=='1')
{
    return this.http.post<UserModel>(this.Authoruserurl,user);
}else
{
  
return this.http.post<UserModel>(this.userUrl,user);
}
  }



 deleteBook(bookId:number):Observable<bookModel>{
    return this.http.delete<bookModel>(this.AuthorBookurl +'/'+bookId);
  }



 updateBook(book: bookModel):Observable<bookModel>{
    return this.http.put<bookModel>(this.baseUrl +'/'+book.bookId,book);
  }

  loginuser(user: UserModel):Observable<any>{
    var request={
      username:user.userName,
      password:user.password
    }
    return this.http.post<any>(this.validateUrl,request);
  }

  // PurchaseBook(book: Purchase):Observable<Purchase> {
  //   return this.http.post<Purchase>(this.purchaseURL, book);
  // }

   // Purchase 
   PurchaseBook(purchases : purchase):Observable<purchase>{
    return this.http.post<purchase>(this.purchaseURL, purchases);
}

//Book History
GetBookHistory(emailId :string):Observable<any>{
    return this.http.get<any>(this.historyURL +"/GetPurchasedBookHistory?emailId="+emailId);
}
  getBookInfo(bookId:number):Observable<bookModel>{
    return this.http.get<bookModel>(this.AuthorBookurl +'/'+bookId);
  }
  getAllBooksauth(id:String):Observable<bookModel[]>{
    return this.http.get<bookModel[]>(this.AuthorBookurl+'/GetauthorBook?uid='+id);
  }
  updatebook(id:number,content:string):Observable<bookModel> {
   
    return this.http.put<bookModel>(this.AuthorBookurl+'/ubook?id='+id+'&content='+content,id);
  }
  deactivatebook(id:number ):Observable<bookModel> {
    //user.userId = '100';
    return this.http.put<bookModel>(this.AuthorBookurl+'/Deactivebook?id='+id,id);
  }

}