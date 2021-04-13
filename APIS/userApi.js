const exp=require("express");
const userApiObj=exp.Router();
const bc=require("bcryptjs")
const asynchandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
require("dotenv").config();
const jwt=require("jsonwebtoken")
userApiObj.use(exp.json())
userApiObj.post("/register", asynchandler(async  (req,res,next)=>{
   
      let userCollectionObj=req.app.get("userCollectionObj")
     
      let userObj=req.body;
     
      let user=await userCollectionObj.findOne({username:userObj.username})
      if(user!==null){
          res.send({message:"user existed"})
      }
      else{
         let hashedpw=await bc.hash(userObj.password,6)
          userObj.password=hashedpw;
       
          let success=await userCollectionObj.insertOne(userObj)
          res.send({message:"user created"})
      }
      
     console.log("user obj is",userObj)
  }))
  
  userApiObj.post("/login", asynchandler(async  (req,res,next)=>{
      //res.send("i am from user api")
  
      let userCollectionObj=req.app.get("userCollectionObj")
      let userCredObj=req.body;
      let user=await userCollectionObj.findOne({username:userCredObj.username})
      if(user==null){
          res.send({message:"Invalid Username"})
      }
      else{
         
          let status=await bc.compare(userCredObj.password,user.password)
          if(status==true){
          
            let token=await jwt.sign({username:user.username},process.env.secret,{expiresIn:10})
            res.send({message:"success",signedToken:token,username:user.username})
    
          }
          else{
              res.send({message:"Invalid password"})
          }
      }
      
     
  }))
  userApiObj.post("/resetpassword",asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");

      obj = req.body;
      hashedpwd = await bc.hash(obj.password,5);
      let user=await userCollectionObj.findOne({username:obj.username})
      if(user==null){
          res.send({message:"invalid"})
      }
      else{
        let success=await userCollectionObj.updateOne({username:obj.username},{$set:{
            password:hashedpwd
        }})
        res.send({message:"success"});
    }
    
}))
  //get user
  userApiObj.get("/getuser/:username",verifyToken,asynchandler(async (req,res,next)=>{
      //get user collectionobject
      let userCollectionObj= req.app.get("userCollectionObj")
     let userObj=await userCollectionObj.findOne({username:req.params.username})
     res.send({message:"success",user:userObj})
  }))
  

  module.exports=userApiObj;