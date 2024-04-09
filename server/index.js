const express = require("express");
const app = express();
const createProblem = require("./routes/problems");

const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const db=require("./config/db");
db();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/v1",createProblem);

app.listen(PORT,()=>{
  console.log(`Server started successfully at port ${PORT}`);
})

app.get("/",(req,res)=>{
  res.send(`<h1>------------------Homepage---------------- <h1>`);
})