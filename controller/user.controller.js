const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt_secret = process.env.JWT_SECRET;


//! 400 -> Bad Request | 403 -> forbidden | 200 -> Success
exports.registerUser = async (req, res) => {
 
  try {
    let user = await UserModel.find({ email: req.body.email });
    if (user.length) 
       return res.status(403).json({msg: "User Already Exists"});
     
    // Storing user details in db
    bcrypt.hash(req.body.password, +process.env.saltRounds, async (err, hashPass) => {
      if (err) {
        res.status(500).json({msg: err.message});
      }
      req.body.password = hashPass;
      user = new UserModel(req.body);
      await user.save();
      res.status(200).json({msg: "User Created Successfully"});
    });
    
  } catch (error) {
    res.status(500).json({msg: error.message});
    console.log(error)
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    if (user.length) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) 
          return res.status(500).json({msg: err.message});
        
        if (result) {
          var token = jwt.sign({ data: user[0].id }, jwt_secret, {
            expiresIn: "2 days",
          });
          const name = user[0].name;
          const email = user[0].email;
          const createdAt = user[0].createdAt;
          res.send({token, name, email, createdAt});
        } else {
          res.status(403).send({msg: "Invalid Credentials"});
        }
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(500).json({msg: err.message});
    // console.log(error);
  }
};
