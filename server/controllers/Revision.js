const user = require("../models/signupModel");
const problem = require("../models/contributerModel");

exports.getList = async(req, res) =>{
    try{
        const userId = req.query.userId;
        const currentPage = req.query.currentPage;
        const probPerPage = req.query.probPerPage;

        const userX = await user.findOne({_id: userId});
        const list = userX.markedQuestion;
        const problemArr = await Promise.all(
            list.map(element => problem.findOne({ _id: element }))
        );

        const end_ind = currentPage * probPerPage;
        const start_ind = end_ind - probPerPage;
        const slicedArr = problemArr.slice(start_ind, end_ind);

        res.status(200).json({
            success: true,
            data:slicedArr,
            length:problemArr.length,
            message:"problems sent successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:err.message,
            message:"Failed to send the list!!!"
        })
    }
}


exports.getSubmissions= async(req, res) =>{
    try{
        const userId = req.query.userId;
        const currentPage = req.query.currentPage;
        const probPerPage = req.query.probPerPage;

        const userX = await user.findOne({_id: userId});
        const list = userX.solvedQuestion;
        const problemArr = await Promise.all(
            list.map(element => problem.findOne({ _id: element }))
        );

        const end_ind = currentPage * probPerPage;
        const start_ind = end_ind - probPerPage;
        const slicedArr = problemArr.slice(start_ind, end_ind);

        res.status(200).json({
            success: true,
            data:slicedArr,
            length:problemArr.length,
            message:"problems sent successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:err.message,
            message:"Failed to send the list!!!"
        })
    }
}