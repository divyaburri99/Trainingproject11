import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products=[];
  count;
  infomessage;
  constructor(private as:AdminService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  
  getAllProducts(){
    this.as.getProducts().subscribe(
      res=>{
        this.products=res["message"]
        this.count=this.products.length;
      },
      err=>{
        alert("Something went wrong in getting products")
        console.log(err)
      }
    )
  }


  delete(n:number){
    let obj=this.products[n];
    console.log("the deleted obj is ",obj)

    this.as.deleteProduct(obj).subscribe(
      res=>{
        if(res["message"]){
          this.toastr.warning('Product Removed from Website');
          this.router.navigateByUrl("/allproducts").then(() => {​​​​​
            window.location.reload();
          }​​​​​);
         
        }
      },
      err=>{
        alert("Something went wrong");
        console.log(err);
      }
    )

  }
   back(){
     this.router.navigateByUrl("/admincomp")
   }
   edit(p){
    localStorage.setItem("productname",p["productname"]);
    this.router.navigateByUrl("/admin/editproduct");
   }
}
