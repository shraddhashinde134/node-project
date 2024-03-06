let express=require("express");
let router=express.Router();
// let User=require("../model/Users");
const Sale = require("../model/Sale");




router.get("/", (req,res)=>{
    Sale.find().then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))

    })

});

router.get("/:id",(req,res)=>{
 
 Sale.findById(req.params.id).then((result)=>{

    res.end(JSON.stringify({status:"success",data:result}))
},(error)=>{
    res.end(JSON.stringify({status:"failed",data:error}))

})


   });

router.post("/", (req,res)=>{
    let body = req.body;

    let sale = new Sale(body);
    


    sale.save().then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))

    })

 });


 router.put("/:id",(req,res)=>{
       

    Sale.findByIdAndUpdate(req.params.id,req.body).then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))
    
    })
    
    
     });

 router.delete("/:id",(req,res)=>{
       

    Sale.findByIdAndDelete(req.params.id).then((result)=>{

        res.end(JSON.stringify({status:"success",data:result}))
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))
    
    })
    
        
});
 module.exports=router;