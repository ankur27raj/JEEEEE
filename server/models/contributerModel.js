const mongoose = require("mongoose");

const contributeSechema = mongoose.Schema({
  username:{
    type:String,
    // required:true
  },
  kind:{
    type:String,
    // required:true
  },
  question:{
    type:String,
    // required:true
  },
  questionImage:{
    data:Buffer,
    contentType:String,
  },
  option1:{
    type:String,
  },
  option2:{
    type:String,
  },
  option3:{
    type:String,
  },
  option4:{
    type:String,
  },
  answer:{
    type:String,
    // required:true
  },
  solutionImage:{
    data:Buffer,
    contentType:String,
  },
  tags:[{
    type:String,
    // required:true
  }],
})

module.exports= mongoose.model("problem",contributeSechema);