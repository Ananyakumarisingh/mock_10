const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const authenticator = (req,res,next)=>{
    const token = req.header('authorization');
    if(token){
        const data = jwt.verify(token, jwt_secret);
        req.userID = data;
        next();
    } else {
        res.status(400).send("Login required!")
    }
}

module.exports = authenticator;