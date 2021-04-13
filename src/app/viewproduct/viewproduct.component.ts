import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

 productname;
 username;
 product;
 successmessage;
 errormessage;
 products=[];
  constructor(private as:AdminService,private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.productname=localStorage.getItem("productname")
     this.username=localStorage.getItem("username")
    this.getProduct();
  }
   getProduct(){
     this.as.getproductdata(this.productname).subscribe(
      res=>{
        if(["Details"]){
          this.product=res.Details
          console.log(this.product)
        }
        else{
          alert("book not found")
        }
      },
      err=>{
        alert("Something went Wrong in Book Details page")
        console.log(err);
      }
     )
   }
   additem(){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.product.productname,
      productID:this.product.productID,
      brand:this.product.brand,
      colour:this.product.colour,
      rating:this.product.rating,
      category:this.product.category,
      quantity:this.product.quantity,
      cost:this.product.cost,
      description:this.product.description,
      productImgLink:this.product.productImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.usercart(obj).subscribe(
        res=>{
         
            if(res["message"]=="success"){
              this.successmessage="Product added to cart";
              this.toastr.success(this.successmessage)
               
             // window.location.reload();
               this.router.navigateByUrl("/usercart")
            }
           
            if(res["message"]=="Item already added"){
             this.errormessage="Item already added...";
             this.toastr.error(this.errormessage)
           //  this.router.navigateByUrl("/usercart")
           }
           
          },
         
      
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  wishlist(){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.product.productname,
      productID:this.product.productID,
      brand:this.product.brand,
      colour:this.product.colour,
      rating:this.product.rating,
      category:this.product.category,
      quantity:this.product.quantity,
      cost:this.product.cost,
      description:this.product.description,
      productImgLink:this.product.productImgLink
      }
      
      //console.log("this new obj is ",obj)
      this.us.userwishlist(obj).subscribe(
        res=>{
         
            if(res["message"]=="success"){
              this.successmessage="Product added to wishlist";
              this.toastr.success(this.successmessage)
               
             // window.location.reload();
               this.router.navigateByUrl("/wishlist")
            }
           
            if(res["message"]=="Item already added"){
             this.errormessage="Item already added...";
             this.toastr.error(this.errormessage)
           //  this.router.navigateByUrl("/usercart")
           }
           
          },
         
      
        err=>{
          alert("Something went wrong in Adding Course")
        console.log(err)
        }
      )
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  back(){
    this.router.navigateByUrl("home")
  }
}
