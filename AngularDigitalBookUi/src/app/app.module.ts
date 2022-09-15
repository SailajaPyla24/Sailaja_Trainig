import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PublishbookComponent } from './publishbook/publishbook.component';
import { FormsModule } from '@angular/forms';
import { AvailablebooksComponent } from './availablebooks/availablebooks.component';
import { ReaderComponent } from './reader/reader.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ViewcontentComponent } from './viewcontent/viewcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignUpComponent,
    LoginComponent,
    PublishbookComponent,
    AvailablebooksComponent,
    ReaderComponent,
    PurchaseComponent,
    ViewcontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
