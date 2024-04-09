const mongoose = require("mongoose");
require("dotenv").config();
const db = ()=>{
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(()=>console.log("DB Connected Successfully"))
  .catch(()=>console.log("failed db"));
};

module.exports=db;