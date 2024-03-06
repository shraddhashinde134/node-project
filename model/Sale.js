let mongoose = require("mongoose");
let Schema = mongoose.Schema;

 let schema = new Schema({
    
    // id: { type: Number, required: true },
    cdate: { type: Date, required: true },
    cname: { type: String, required: true },
    cmobileno: { type: String, required: true },
   //  subtotal: { type: Number,required:true},
   //  gsttotal:{type:Number ,required:true},
    grandTotal : { type: Number,required:true},
    
    products:[
     {   
      
        productid: { type: mongoose.Schema.Types.ObjectId,ref:'product' ,required:true},
        name:{type:String,required:true},
        mrp:{type:Number,required:true},
        price: { type: Number,required:true},
        quantity: { type: Number,required:true},
        subtotal: { type: Number,required:true},
        gstpercent: { type: Number,required:true},
        gsttotal: { type: Number,required:true},
        billtotal: { type: Number,required:true},
     }
   ]




})
let Sale = mongoose.model("sale", schema);

module.exports = Sale;