//import express module
const exp=require("express");
const app=exp();  
const path=require("path");
const mc=require("mongodb").MongoClient;

app.use(exp.static(path.join(__dirname,"./dist/FLIPKARTAPP")))

const userApiObj=require("./APIS/userApi")

const adminApiObj = require("./APIs/adminApi");
const cartApiObj=require("./APIS/cartApi")
const orderApiObj=require("./APIS/orderApi")
const wishlistApiObj=require("./APIS/wishlistApi")
app.use("/user",userApiObj)
app.use("/admin",adminApiObj);
app.use("/cart",cartApiObj)
app.use("/order",orderApiObj)
app.use("/wish",wishlistApiObj)
const dburl=process.env.dburl
 
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
       const databaseObj=client.db("ProjectDatabase");

       const userCollectionObj=databaseObj.collection("usercollection")
       const productCollectionObj=databaseObj.collection("productcollection")
       const cardCollectionObj=databaseObj.collection("cartcollection")
       const orderCollectionObj=databaseObj.collection("orderscollection")
       const wishlistCollectionObj=databaseObj.collection("wishlistcollection")


       app.set("userCollectionObj",userCollectionObj)
       app.set("productCollectionObj",productCollectionObj)
       app.set("cardCollectionObj",cardCollectionObj)
       app.set("orderCollectionObj",orderCollectionObj)
       app.set("wishlistCollectionObj",wishlistCollectionObj)

         console.log("Db server started")

})

.catch(err=>console.log("err in db connection",err))

app.use((req,res,next)=>{
    
       res.send({message:`${req.url} is invalid`})  
})
app.use((err,req,res,next)=>{
       res.send({message:"error occurred",reason:err.message})
})
const port=process.env.port||8080;

app.listen(port,()=>console.log(`server on port ${port}....`))