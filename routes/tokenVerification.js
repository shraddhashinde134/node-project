let jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    try{
        if(req.headers.authorization == null){
            res.status(401).json({success: false, message: "Error!Token was not provided."});
        }
        const token = req.headers.authorization.split(' ')[1];    
        var user = jwt.verify(token, "secretkeyappearshere");
        next();
    }
    catch(ex){
        res.status(401).json({status:"failed",data:"Error!Token is not valid"});
    }
}
exports.authenticateToken = authenticateToken;