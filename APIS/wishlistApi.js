const exp=require("express");
const wishlistApiObj=exp.Router();
const bc=require("bcryptjs")
const asynchandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
require("dotenv").config();
const jwt=require("jsonwebtoken")
wishlistApiObj.use(exp.json())
wishlistApiObj.post("/addto",asynchandler( async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")
    let cartObj=req.body;
    //console.log(cartObj)
   
    let cart = await wishlistCollectionObj.findOne({productname:cartObj.productname,username:cartObj.username})
    
    if(cart!==null){
        res.send({message:"Item already added"})
    }
    else{
        await wishlistCollectionObj.insertOne(cartObj);
        res.send({message:"success"})
    }
   
}))
wishlistApiObj.get("/getwishlistitems/:username",asynchandler(async(req,res,next)=>{

    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");
    let products=await wishlistCollectionObj.find({username:req.params.username}).toArray();
    //console.log(products)

    res.send({message:products})
}))


wishlistApiObj.post("/deleteproduct",asynchandler(async(req,res,next)=>{
   
    let wishlistCollectionObj = req.app.get("wishlistCollectionObj");
    let cartObj =  req.body;
 
    let product = await wishlistCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await wishlistCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))

module.exports=wishlistApiObj;