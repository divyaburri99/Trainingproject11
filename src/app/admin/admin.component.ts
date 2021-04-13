import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  file:File; 
  currentRate=0;
  username:any;
  successmessage;
  errormessage;
  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }
  adminname;
  registerForm:FormGroup;
 
  constructor(private as:AdminService,private router:Router,private toastr:ToastrService) { }
  
  ngOnInit(): void {
   // window.location.reload();
    this.username=localStorage.username;
    this.adminname=localStorage.getItem("adminname")

    this.registerForm=new FormGroup({
        productname:new FormControl(null,Validators.required),
        productID:new FormControl(null,Validators.required),
        brand:new FormControl(null,Validators.required),
        colour:new FormControl(null,Validators.required),
        category:new FormControl(null,Validators.required),
        cost:new FormControl(null,Validators.required),
        rating:new FormControl(null,Validators.required),
        quantity:new FormControl(null,Validators.required),
        description:new FormControl(null,Validators.required)

    })
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
    
  }

  onSubmit(){   
    let productObj = this.registerForm.value;
    console.log(productObj);
    let formData = new FormData();

    //adding image and other data to FormData object
    formData.append('photo',this.file,this.file.name);
    formData.append("productObj",JSON.stringify(productObj)) 

    this.as.createProduct(formData).subscribe(
      res=>{
        if(res["message"] == "product added"){
          this.successmessage= "Product Added Successfully"
          this.toastr.success(this.successmessage)
          this.router.navigateByUrl("/allproducts");
        } 
        if(res["message"] == "product existed"){

          this.errormessage="ProductID is already existed..choose another";
          this.toastr.error(this.errormessage)
        }
      },
      err=>{
        alert("Something went wrong in adding product");
        console.log(err);
      }  
    )
    
  }
}
