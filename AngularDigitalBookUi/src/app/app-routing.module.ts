import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PublishbookComponent } from './publishbook/publishbook.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AvailablebooksComponent } from './availablebooks/availablebooks.component';
import { ReaderComponent } from './reader/reader.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ViewcontentComponent } from './viewcontent/viewcontent.component';



const routes: Routes = [{path:'home',component:HomePageComponent},
{path:'SignUp',component:SignUpComponent},
{path:'AvailableBooks', component:AvailablebooksComponent},
{path:'Logout',component:HomePageComponent},
 {path:'Publish',component:PublishbookComponent},
{path:'Login',component:LoginComponent},
{path:'purchase',component:PurchaseComponent},
{path:'purchase/:id',component:PurchaseComponent},
{path:'ViewContent/:bookId',component:ViewcontentComponent},
{path:'Reader',component:ReaderComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
