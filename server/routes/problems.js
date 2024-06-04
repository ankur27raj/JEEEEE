const express=require("express");
const router = express.Router();
const {getProblem,getProblemById,getProblemByText} = require("../controllers/getProblem");
const {createProblem} = require("../controllers/createProblem");
const {updateProblem} = require("../controllers/updateProblem");
const {deleteProblem} = require("../controllers/deleteProblem");
const { createContest } = require("../controllers/contestControllers.js/createContest");
const { getContest, getContestById } = require("../controllers/contestControllers.js/getContest");
const {signup, login} = require("../controllers/Auth")
const {checkout,paymentVerification} = require("../controllers/paymentController.js");

router.post("/signup", signup);
router.post("/login", login);

router.get("/getProblem",getProblem);
router.get("/getProblemByText",getProblemByText);
router.get("/getProblem/:id",getProblemById);
router.post("/createProblem",createProblem);
router.put("/updateProblem/:id",updateProblem);
router.delete("/deleteProblem/:id",deleteProblem);
router.post("/createContest",createContest);
router.get("/getContest",getContest);
router.get("/getContest/:id",getContestById);
router.post("/checkout",checkout);
router.post("/paymentverification", paymentVerification);

module.exports = router;