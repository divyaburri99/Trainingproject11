import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  s1:any;
  status:any;
   errormessage;
  constructor(private as:AdminService,private router:Router,private us:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    //this.toastr.success('login loaded',"welcome to login page")
    
    this.loginForm=new FormGroup({
       username:new FormControl(null,Validators.required),
       password:new FormControl(null,Validators.required)
    })
   
  }
  reset(){
    this.router.navigateByUrl("/resetpassword")
  }
  register(){
    this.router.navigateByUrl("/register")
  }
  onSubmit(){

    let userCredObj=this.loginForm.value;
   
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
              if(res.username=="Admin"){
                this.router.navigateByUrl("/admincomp")
              }
            //navigate to user component
            else{
              this.router.navigateByUrl("/home")
            }
          }
          else{
          
             this.errormessage= res["message"]
            this.toastr.error(this.errormessage)
            console.log("error is",res["reason"]);
    
            this.router.navigateByUrl("/login")
          }
        },
        err=>{
        
       
           alert("Something went wrong in user login")
           console.log(err)
        }
      )

      }

}
