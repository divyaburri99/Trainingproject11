import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

 

  createProduct(product:any):Observable<any>{

    return this.hc.post("/admin/addproduct",product);
  }
  getProducts():Observable<any>{
    return this.hc.get("/admin/allproducts");
  }
 
  deleteProduct(obj):Observable<any>{
  
    return this.hc.post("/admin/delete",obj);
  }
  

  getproductdata(productname):Observable<any>{
    return this.hc.get("/admin/getproductdata/"+productname);
  }
  viewItem(obj):Observable<any>{
    return this.hc.post("/viewproduct",obj)
  }
  
  editproduct(obj):Observable<any>{
    return this.hc.put("/admin/updateproduct",obj)
  }
}
