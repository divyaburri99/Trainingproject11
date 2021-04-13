const exp=require("express");
const cartApiObj=exp.Router();
const bc=require("bcryptjs")
const asynchandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
require("dotenv").config();
const jwt=require("jsonwebtoken")
cartApiObj.use(exp.json())
cartApiObj.post("/addtocart",asynchandler(async(req,res,next)=>{

    //console.log("the cart obj is ",req.body)
    let cardCollectionObj= req.app.get("cardCollectionObj");

    let cartObj=req.body;
    let prd = await cardCollectionObj.findOne({productname:cartObj.productname,username:cartObj.username})
   if(prd==null){
    let userCart = await cardCollectionObj.find({  username:req.body.username});
        await cardCollectionObj.insertOne(cartObj);
        res.send({message:"success",cartsize:userCart.length})
  
        
   }
    else{
        let userCart = await cardCollectionObj.find({  username:req.body.username});
     res.send({message:"Item already added",cartsize:userCart.length})
    }
}))

cartApiObj.get("/getcartitems/:username",asynchandler(async(req,res,next)=>{

    let cardCollectionObj = req.app.get("cardCollectionObj");
    let productCollectionObj=req.app.get("productCollectionObj");
    let items=await productCollectionObj.find().toArray()
    let products = await cardCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products,itemsArray:items})
    //console.log(products)
}))
cartApiObj.get("/getsize/:username",asynchandler(async(req,res,next)=>{
    let cardCollectionObj = req.app.get("cardCollectionObj");
    
    let cart=await cardCollectionObj.find({username:req.params.username}).toArray();
    let cartlength=cart.length;
    res.send({cartsize:cartlength } );
    //console.log("the size is ",cart);
}))

cartApiObj.post("/deleteproduct",asynchandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))
module.exports=cartApiObj;