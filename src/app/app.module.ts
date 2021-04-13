import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { SearchPipe } from './search.pipe';
import { CategoryPipe } from './category.pipe';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { UsercartComponent } from './usercart/usercart.component';
import { FooterComponent } from './footer/footer.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SearchPipe,
    CategoryPipe,
    ViewproductComponent,
    UsercartComponent,
    FooterComponent,
    PlaceorderComponent,
    WishlistComponent,
   
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-top-center',
      closeButton:true
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
