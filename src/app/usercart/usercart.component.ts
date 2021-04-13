import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  username;
  cart=[];
  amount;
  userOrderSize;
  itemsArray=[];
  status=false;
  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.totalamount(); 
    this.checkCart();
    this.orderStatus();
  }
  incr(p:any){
    console.log("quantity is ",p.quantity)
    console.log("cost",p.cost)
    if(p.quantity&&p.status=="Available"){
      let cost=p.cost/p.quantity;
    p.quantity+=1;

    p.cost=p.quantity*cost;
    this.totalamount();
    }

  }
  decr(p:any){
    if(p.quantity!=1){
      let cost=p.cost/p.quantity;
      p.quantity-=1;
      
      p.cost=p.quantity*cost;
      this.totalamount();
      }
  
  }





  totalamount(){
    this.amount=0;
        for(let i=0;i<this.cart.length;i++){
          if(this.cart[i].status!="Unavailable"){
          let cost=this.cart[i].cost/this.cart[i].quantity;
          this.amount+=cost*this.cart[i].quantity
          }
       
        }
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  orderStatus(){
    this.us.getOrderSize(this.username).subscribe(
      res=>{
        this.userOrderSize=res["ordersize"];
      },

      err=>{
        alert("Something went wrong in orders")
        console.log(err)
      }
    )

  }

  back(){
    this.router.navigateByUrl("/home")
  }
  getCart(){
    this.us.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res["message"]
        this.itemsArray=res.itemsArray;
        console.log("the cart items",this.cart)
        this.checkCart();
      //  this.totalamount()

      },
      err=>{
        alert("Something went wrong in Adding Product")
        console.log(err)
      }
    )
  }
  checkCart(){
    for(let i=0;i<this.cart.length;i++){
      for(let j=0;j<this.itemsArray.length;j++){
        if(this.cart[i].productname==this.itemsArray[j].productname){
          this.status=true;
          this.cart[i].status="Available";//adds status as available to the cart element
          console.log("available");
          break;
        }
      }
      if(this.cart[i].status!="Available"){
        this.cart[i].status="Unavailable";
        console.log("unavailable");
      }
      //console.log(this.cart[i])
    }
    this.totalamount();
  }


  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

    this.us.deleteCartProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          this.toastr.warning('Product Removed from Cart');
          this.router.navigateByUrl("/usercart").then(() => {​​​​​
            window.location.reload();
          }​​​​​);
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
 
  additem(n:number){
    if(this.username!==null){
      let obj={
      username:this.username,
      productname:this.cart[n].productname,

      colour:this.cart[n].colour,
    
      cost:this.cart[n].cost,
      brand:this.cart[n].brand,
      productImgLink:this.cart[n].productImgLink,
      rating:this.cart[n].rating,
      quantity:this.cart[n].quantity
      }
      
      //console.log("this new obj is ",obj)
      this.us.placeOrder(obj).subscribe(
        res=>{
          if(res["message"]){

           
            this.toastr.success('Product Ordered Successfully');
             this.router.navigateByUrl("/usercart").then(() => {​​​​​
              window.location.reload();
            }​​​​​);
          }
         
        },
        err=>{
          this.toastr.warning('Something went wrong in adding order');
        console.log(err)
        }
         

        
      )

     this.us.deleteOrder1(obj).subscribe(
        res=>{
          if(res["message"]){

            this.toastr.warning('Product Deleted from Cart');
          }
        },
        err=>{
          this.toastr.warning('Something went wrong in order deletion');
          console.log(err);
        }
      )
  
      
    }
    else{
      this.router.navigateByUrl("/login")
    }
  }
  showorders(){
    this.router.navigateByUrl("/placeorder")
  }

}
