let express=require("express");
let bodyparser=require("body-parser");
let  cors = require("cors");





//connecting moo=ngoose create var

let mongoose=require("mongoose");


let app=express();
app.use(cors())
app.use(express.static("public"));
app.use(bodyparser.json({limit:'500mb'}));
app.use(bodyparser.urlencoded({limit:'500mb',extended:true}));
app.use(express.json());

//to give access to outside world (react/angular)
app.use((req,res,next)=>{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers","*");
if(req.method == "OPTIONS")
{
res.header("Access-Control-Allow-Methods ","POST,GET,PUT,DELETE");
return res.status(200).json({})
}
next();
});


//connecting url to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/salesproject");
//create db obj using mongoose url
let db=mongoose.connection;


db.on("error",(error)=>
{
    console.log("connection failed");
    console.log(error);
});

db.on("open",()=>
{
    console.log("connection successful");
    
});
app.use("/users",require("./routes/users"));
app.use("/products",require("./routes/products"));
app.use("/sales",require("./routes/sales"));
app.use("/authentication",require("./routes/authentication"));

app.get("/",(req,res)=>{
    res.end("welcome to mongoosecrud")
})


app.listen(8081,(req,res)=>{
    console.log("server is running");
})