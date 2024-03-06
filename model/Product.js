// const { Double } = require("mongodb");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

 let schema = new Schema({
    
    name: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    gstpercent: { type: Number, required: true },
    imagepath: { type: String},




})
let Product = mongoose.model("product", schema);

module.exports = Product;