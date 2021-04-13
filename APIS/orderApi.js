const exp=require("express");
const orderApiObj=exp.Router();
const bc=require("bcryptjs")
const asynchandler=require("express-async-handler");
const verifyToken=require("./middlewares/verifyToken")
require("dotenv").config();
const jwt=require("jsonwebtoken")
orderApiObj.use(exp.json())

orderApiObj.post("/deleteOrder1",asynchandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    console.log("user object is",cartObj);

    //check for user in db
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});

    console.log("product delete in add to cart ",product)
    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))
  //place order

orderApiObj.post("/orders",asynchandler(async(req,res,next)=>{

    //console.log("the cart obj is ",req.body)
    let orderCollectionObj= req.app.get("orderCollectionObj");

    let cartObj=req.body;
  
    
    
   // let cart = await orderCollectionObj.findOne({productname:cartObj.productname,username:cartObj.username})
    
   
    let success=await orderCollectionObj.insertOne(cartObj);
    res.send({message:true})
   
    
}))

orderApiObj.get("/getOrderitem/:username",asynchandler(async(req,res,next)=>{

    let orderCollectionObj = req.app.get("orderCollectionObj");
    
    let products = await orderCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    console.log(products)
}))


orderApiObj.post("/deleteOrder",asynchandler(async(req,res,next)=>{
    
    let orderCollectionObj = req.app.get("orderCollectionObj");
    let orderObj =  req.body;
    
    console.log("order object is",orderObj);
    //check for user in db
    let product = await orderCollectionObj.findOne({productname:orderObj.productname});

    console.log("product in placeorder delete is",product);

    //product is there
    if(product!==null){
        let remove=await orderCollectionObj.deleteOne({productname:orderObj.productname});
        res.send({message:true});
    }

}))
orderApiObj.get("/ordersize/:username",asynchandler(async(req,res,next)=>{
    let orderCollectionObj = req.app.get("orderCollectionObj");
    
    let order=await orderCollectionObj.find({username:req.params.username}).toArray();
    let orderlength=order.length;
    res.send({ordersize:orderlength } );
    //console.log("the size is ",cart);
}))
module.exports=orderApiObj;