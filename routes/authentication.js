let express=require("express");
let router=express.Router();
let User=require("../model/Users");
let jwt = require("jsonwebtoken");

router.post("/login", (req,res)=>{
    let body = req.body;
    User.findOne({email:body.email, password:body.password}).then((result)=>{
        if(result == null){
            res.end(JSON.stringify({status:"invalid",data:"Invalid credentials"}))    
        }
        else{
            let user = {_id:result._id, name:result.name, email:result.email};
            let token = jwt.sign(user, "secretkeyappearshere", { expiresIn: "24h" });
            res.end(JSON.stringify({status:"success",data:user, token:token}));
        }        
    },(error)=>{
        res.end(JSON.stringify({status:"failed",data:error}))
    })
 });


 module.exports=router;