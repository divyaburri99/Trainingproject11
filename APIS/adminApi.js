const exp=require("express");
const adminApiObj=exp.Router();
const asyncHandler=require("express-async-handler")
require("dotenv").config();
//extract body of req obj
adminApiObj.use(exp.json());

//import cloudinary
const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const multer=require("multer");

//configure cloudinary
cloudinary.config({ 
    cloud_name:process.env.cloudname, 
    api_key:process.env.apikey, 
    api_secret:process.env.apisecret
});

//configure cloudinarystorage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:process.env.folder,
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });


adminApiObj.post("/addproduct",upload.single('photo'), asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    
    
    let productObj =  JSON.parse(req.body.productObj)
    
    //console.log("object is",productObj);
    let product = await productCollectionObj.findOne({productID:productObj.productID});

    //if username alreaddy taken
    if(product!==null){
        res.send({message:"product existed"});
    }
   else{

        productObj.productImgLink = req.file.path;

        //create product
        let success=await productCollectionObj.insertOne(productObj);
        res.send({message:"product added"})    
   }
}))

//get all products
adminApiObj.get("/allproducts",asyncHandler(async(req,res,next)=>{

    let productCollectionObj = req.app.get("productCollectionObj");
    let products = await productCollectionObj.find().toArray();
    res.send({message:products})
}))

//get one products

adminApiObj.post("/viewproduct",asyncHandler(async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj");
    //console.log("In ViewItem ",req.body)
    let Obj=req.body;
    let viewItem=await productCollectionObj.findOne({productname:Obj.productname});
    
    if(viewItem!==null){
        //create a token
        let token = await jwt.sign({productname:viewItem.productname},process.env.secret,{expiresIn:10});

        //send token
        res.send({message:true,signedToken:token,productname:viewItem.productname});
    }
    
}))

//get one products


adminApiObj.get("/getproductdata/:productname",asyncHandler(async (req,res,next)=>{

    let productCollectionObj = req.app.get("productCollectionObj") ;
  
    let proObj=await productCollectionObj.findOne({productname:req.params.productname});
    
    console.log("product is",proObj);
    if(proObj!==null){
        res.send({Details:proObj})
    }
    else{
        res.send({message:"product not found"})
    }
    
    }))

adminApiObj.put("/updateproduct",asyncHandler(async(req,res,next)=>{
    //console.log(req.body)
    let Allproducts=req.app.get("productCollectionObj")
    let productDetails=await Allproducts.findOne({productID:req.body.productID})
    if(productDetails!==null){
        let edit=await Allproducts.updateOne({productID:req.body.productID},{$set:{
            productname:req.body.productname,
            brand:req.body.brand,
            category:req.body.category,
            colour:req.body.colour,
            rating:req.body.rating,
            quantity:req.body.quantity,
            cost:req.body.cost,
            description:req.body.description
           
        }});
        res.send({message:true});
    }
    else{
        res.send({message:"product not found"})
    }
}))


//delete from all products
adminApiObj.post("/delete",asyncHandler(async(req,res,next)=>{
    
    let productCollectionObj = req.app.get("productCollectionObj");
    let productObj =  req.body;
    
  
    let product = await productCollectionObj.findOne({productID:productObj.productID});

    
    if(product!==null){
        let remove=await productCollectionObj.deleteOne({productID:productObj.productID});
        res.send({message:true});
    }

}))
//export
module.exports = adminApiObj;