import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   userCartSize:number=0;
   cartsize=0;
  constructor(private hc:HttpClient) { }

      createUser(userObj):Observable<any>{
        return this.hc.post("/user/register",userObj)
      }
      loginUser(userCredObj):Observable<any>{
        return this.hc.post("/user/login",userCredObj)
      }
      getUser(username):Observable<any>{
        return this.hc.get("/user/getuser/"+username)
      }
      changePassword(obj){
        return this.hc.post("/user/resetpassword",obj)
      }

      //user cart 

    usercart(obj):Observable<any>{
      return this.hc.post("/cart/addtocart",obj);
    }

    getCartItems(username):Observable<any>{
      //console.log("the username is ",username)
      return this.hc.get("/cart/getcartitems/"+username);
    }
    deleteCartProduct(obj):Observable<any>{
      return this.hc.post("/cart/deleteproduct",obj);
    }

    getCartSize(username){
      return this.hc.get("/cart/getsize/"+username);
    }
  
     //orders

      
  placeOrder(obj:any):Observable<any>{
    return this.hc.post("/order/orders",obj);
  }
  
  getOrderItems(username:any):Observable<any>{
    //console.log("the username is ",username)
    return this.hc.get("/order/getOrderitem/"+username);
  }
  deleteOrderProduct(obj5:any):Observable<any>{
    return this.hc.post("/order/deleteOrder",obj5);
  }
  getOrderSize(username){
    return this.hc.get("/order/ordersize/"+username);
  }
  deleteOrder1(obj:any):Observable<any>{
    console.log("service delete is",obj)
    return this.hc.post("/order/deleteOrder1",obj);
    
  }




  userwishlist(obj):Observable<any>{
    return this.hc.post("/wish/addto",obj)
  }
  getWishlistItems(username):Observable<any>{
    return this.hc.get("/wish/getwishlistitems/"+username);
  }
  deleteWishlistProduct(obj):Observable<any>{
   
    return this.hc.post("/wish/deleteproduct",obj);
  }
}
