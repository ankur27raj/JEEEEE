const express=require("express");
const router = express.Router();
const {getProblem,getProblemById} = require("../controllers/getProblem");
const {createProblem} = require("../controllers/createProblem");
const {updateProblem} = require("../controllers/updateProblem");
const {deleteProblem} = require("../controllers/deleteProblem");

router.get("/getProblem",getProblem);
router.get("/getProblem/:id",getProblemById);
router.post("/createProblem",createProblem);
router.put("/updateProblem/:id",updateProblem);
router.delete("/deleteProblem/:id",deleteProblem);

module.exports = router;