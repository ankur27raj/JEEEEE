const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  first:{
    type:String,
    required:true,
    trim:true
  },
  last:{
    type:String,
    required:true,
    trim:true
  },
  username:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"User"
  },
  token:{
    type:String,
  }
})

module.exports= mongoose.model("user",signupSchema);