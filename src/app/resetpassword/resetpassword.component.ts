import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private us:UserService,private router:Router,private toastr:ToastrService) { }


  status=false;
  errormessage;
  successmessage
 
  formRef: FormGroup;
  ngOnInit(): void {
    this.formRef=new FormGroup({
    
      username:new FormControl(null,Validators.required),
     
      password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z]).*$')]),
      conpassword:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z]).*$')]),

    })
  }
  back(){
    this.router.navigateByUrl("/login")
  }
  
   onSubmit(){
     let username=localStorage.getItem("username")
     let obj=this.formRef.value;
     if(obj.password==obj.conpassword){
       this.us.changePassword(obj).subscribe(
         res=>{
           if(res["message"]=="success"){
             this.successmessage="password changed";
             this.toastr.success(this.successmessage)
             this.router.navigateByUrl("/login")
           }
           if(res["message"]=="invalid"){
             this.errormessage="invalid user";
             this.toastr.error(this.errormessage)
           }
         },
         err=>{
           alert("something wrong in password reset")
           console.log(err)
         }
       )
     }
     else{
       this.status=true;
     }
   }


}
