const problem = require("../models/contributerModel");

exports.getProblemById = async(req,res)=>{
  try{
    const {id}=req.param;
    const response=await problem.findById({_id:id});
    if(!response) {
      return res.status(400).json({
        success:false,
        message:"Data Not Found"
      })
    }
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

exports.getProblem = async(req,res)=>{
  try{
    const response=await problem.find({});
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

