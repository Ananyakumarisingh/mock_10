const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery',true)
const mongoURI = process.env.mongo_URI;

const connectToMongo = async()=>{
  try {
   await mongoose.connect(mongoURI);
   console.log('Connected to mongoose')
  } catch (error) {
    console.log(error)
  }
}
module.exports = connectToMongo;