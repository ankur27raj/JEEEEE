const problem = require("../models/contributerModel");

exports.createProblem = async(req,res)=>{
  try{
    const {username,question,option1,option2,option3,option4,answer,solutionImage,tags,questionImage,kind}=req.body;
    const data = {username,question,option1,option2,option3,option4,answer,solutionImage,tags,questionImage,kind};
    const response=await problem.create(data);
    res.status(200).json({
      success:true,
      data:response,
      message:"Problem Sent Successfully"
    })
    console.log("SENT");
  }
  catch(err){
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Failed!!!"
    })
  }
};