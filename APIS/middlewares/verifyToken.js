const jwt=require("jsonwebtoken")
require("dotenv").config();
const verifyToken=(req,res,next)=>{
    
    let tokenWithBearer=req.headers["authorization"]  
   if(tokenWithBearer){

       let token=tokenWithBearer.slice(7,tokenWithBearer.length)
     
      jwt.verify(token,process.env.secret,(err,decoded)=>{
          if(err){
              return res.send({message:"session expired..plz relogin"})
          }
          else{
              next()
          }
      }) 
   }
   
   else{
       return res.send({message:"un authorized access.Plz login to continue"})
   }

}
module.exports=verifyToken;