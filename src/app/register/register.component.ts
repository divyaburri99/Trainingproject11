import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   errormessage;
   successmessage;
   registerForm:FormGroup
  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
       firstname:new FormControl(null,Validators.required),
       lastname:new FormControl(null,Validators.required),
       email:new FormControl(null,Validators.required),
       username:new FormControl(null,[Validators.required,Validators.minLength(4)]),
       password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z]).*$')])
    })
  }
  login(){
    this.router.navigateByUrl("/login")
  }
  onSubmit(){   
    let userObj = this.registerForm.value;
    console.log(userObj);
    
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"]=="user existed"){
          this.errormessage="Username is already existed..choose another";
          this.toastr.error(this.errormessage)
        }
        if(res["message"]=="user created"){
          this.successmessage="Registration successful";
          this.toastr.success(this.successmessage)
          //navigate to login component
          this.router.navigateByUrl("/login");
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }  
    )
    
}


}
