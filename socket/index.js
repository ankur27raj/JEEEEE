const express=require("express");
const {Server}=require("socket.io");
const { createServer }=require("http");
const cron = require('node-cron');
const moment = require('moment');
const PORT = 5000;
let startTime;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on('connection', (socket) => {
  console.log("User Connected", socket.id);
     socket.on('clientMessage',(start)=>{
      startTime=start.tm;
      const dt=new Date(startTime);
      const curDate=new Date();
      const dt_m=moment(dt).add(start.dur,'minutes');
      console.log(dt_m);

      if(dt >= curDate) {
        i=start.i;
        let str = `${dt.getMinutes()} ${dt.getHours()} ${dt.getDate()} ${dt.getMonth()+1} *`;
        const job= cron.schedule(str, () => {
          socket.emit('message', i);
          job.stop();
        });
      }
      else if(dt_m>=curDate) {
        i=start.i;
        socket.emit('message',i);
        let str = `${dt_m.minute()} ${dt_m.hour()} ${dt_m.date()} ${dt_m.month()+1} *`;
        const job= cron.schedule(str, () => {
          socket.emit('end', i);
          job.stop();
        });
      }
    })
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.get("/", (req, res) => {
  res.send("Hello World!");
});

