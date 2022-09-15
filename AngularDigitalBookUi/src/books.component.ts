import { UserModel } from "./app/users.component";
export interface bookModel{
    bookId:number;
    bookName:string;
    categoryId:string;
    price:string;
    publisher:string;
    userId:number;
    publishedDate:Date;
    content:string;
    active:boolean;
    userModel:UserModel;
}