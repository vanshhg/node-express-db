const express = require("express");
const { connectMdB } = require('./connection');

const {logReqRes} = require('./middleware/index');

const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;


app.use(express.urlencoded({extended: false}));


//connnection mongoDb
connectMdB("mongodb://127.0.0.1:27017/yt-app1").then(()=> 
    console.log("MongoDb connected!")
);
//middleware
app.use(logReqRes('log.txt'));

//router
app.use("/api/users", userRouter);



app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));