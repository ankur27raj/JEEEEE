const problem = require("../models/contributerModel");

exports.updateProblem = async(req,res)=>{
  try{
    const {id}  =req.params;
    const {
      username,question,option1,option2,option3,option4,answer,solutionImage,tags,questionImage
    }=req.body;
    const data = {username,question,option1,option2,option3,option4,answer,solutionImage,tags,questionImage};
    const response=await problem.findByIdAndUpdate({_id:id},data);
    res.status(200).json({
      success:true,
      data:response,
      message:"Problem Sent Successfully"
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      data:err.message,
      message:"Failed!!!"
    })
  }
};