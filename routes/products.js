let express=require("express");
let router=express.Router();
// let User=require("../model/Users");
const Product = require("../model/Product");

let multer=require("multer");
let path=require("path");


//Define where project photos will be stored
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, '././public/userpics/');
    },
    filename: function (request, file, callback) {
      const timestamp = Date.now();
      const uniqueFilename = timestamp +"."+ path.extname(file.originalname).slice(1);
      
      callback(null, uniqueFilename)
      request.imagepath="userpics/"+uniqueFilename;
     console.log(request.imagepath);
    
    }
  });
  var upload=multer({storage:storage})


router.get("/", (req,res)=>{
    Product.find().then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))

    })

});

router.get("/:id",(req,res)=>{
 
 Product.findById(req.params.id).then((result)=>{

    res.end(JSON.stringify({status:"success",data:result}))
},(error)=>{
    res.end(JSON.stringify({status:"failed",data:error}))

})


   });

router.post("/", upload.single("image"),(req,res)=>{
    let body = req.body;
    let product = new Product(body);
    product.imagepath= req.imagepath;


    product.save().then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))

    })

 });


 router.put("/:id", upload.single("image"), (req, res) => {
    // Construct an object with only the fields that need to be updated
    const updateFields = { ...req.body };
    if (req.file) {
      // If a new image is uploaded, update the imagepath field
      updateFields.imagepath = req.imagepath;
    }
  
    // Find the product by ID and update only the specified fields
    Product.findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .then((result) => {
        if (!result) {
          return res.status(404).json({ status: "failed", message: "Product not found" });
        }
        res.json({ status: "success", data: result });
      })
      .catch((error) => {
        res.status(500).json({ status: "failed", message: error.message });
      });
  });

 router.delete("/:id",(req,res)=>{
       

    Product.findByIdAndDelete(req.params.id).then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))
    
    })
    
        
});
 module.exports=router;